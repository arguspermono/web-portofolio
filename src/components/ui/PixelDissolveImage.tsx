import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface PixelDissolveImageProps {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
  className?: string;
  imageClassName?: string;
}

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = (a_position + 1.0) * 0.5;
}
`;

const fragmentShaderSource = `
precision mediump float;

uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform vec2 u_imageResolution;
uniform vec2 u_viewport;
uniform vec2 u_rect;
uniform float u_fit;
varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  float screenY = u_rect.x + (1.0 - v_uv.y) * u_rect.y;
  float normalizedY = screenY / max(u_viewport.y, 1.0);
  float entering = smoothstep(0.74, 0.98, normalizedY);
  float leaving = 1.0 - smoothstep(0.02, 0.26, normalizedY);
  float edge = clamp(max(entering, leaving), 0.0, 1.0);
  float blockSize = 1.0 + edge * 30.0;

  vec2 cell = floor(v_uv * u_resolution / blockSize);
  vec2 uv = (cell + 0.5) * blockSize / u_resolution;
  float imageAspect = u_imageResolution.x / max(u_imageResolution.y, 1.0);
  float canvasAspect = u_resolution.x / max(u_resolution.y, 1.0);

  if (u_fit < 0.5) {
    if (imageAspect > canvasAspect) {
      uv.x = (uv.x - 0.5) * (canvasAspect / imageAspect) + 0.5;
    } else {
      uv.y = (uv.y - 0.5) * (imageAspect / canvasAspect) + 0.5;
    }
  } else if (imageAspect > canvasAspect) {
    float visibleHeight = canvasAspect / imageAspect;
    uv.y = (uv.y - 0.5) / visibleHeight + 0.5;
  } else {
    float visibleWidth = imageAspect / canvasAspect;
    uv.x = (uv.x - 0.5) / visibleWidth + 0.5;
  }

  float inside = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
  vec4 color = texture2D(u_image, clamp(uv, 0.0, 1.0));
  float dissolve = step(hash(cell), 1.0 - edge * 0.82);
  color.a *= dissolve * inside;
  gl_FragColor = color;
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('WebGL could not allocate a pixel dissolve shader.');

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Unknown shader compilation error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  let fragmentShader: WebGLShader;
  try {
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  } catch (error: unknown) {
    gl.deleteShader(vertexShader);
    throw error;
  }
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error('WebGL could not allocate a pixel dissolve program.');
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || 'Unknown shader program linking error.';
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

export function PixelDissolveImage({
  src,
  alt,
  fit = 'cover',
  className,
  imageClassName,
}: PixelDissolveImageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!root || !image || !canvas || reduceMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      console.warn('WebGL is unavailable; using the sharp image fallback for pixel transitions.');
      return;
    }

    let disposed = false;
    let active = false;
    let initialized = false;
    let failed = false;
    let frame = 0;
    let texture: WebGLTexture | null = null;
    let buffer: WebGLBuffer | null = null;
    let program: WebGLProgram | null = null;
    let positionLocation = -1;
    let uniforms: {
      resolution: WebGLUniformLocation | null;
      imageResolution: WebGLUniformLocation | null;
      viewport: WebGLUniformLocation | null;
      rect: WebGLUniformLocation | null;
      image: WebGLUniformLocation | null;
      fit: WebGLUniformLocation | null;
    } | null = null;
    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

    const setFallback = () => {
      image.style.opacity = '1';
      canvas.style.opacity = '0';
    };

    const scheduleRender = () => {
      if (frame || !active || !initialized || disposed) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        render();
      });
    };

    const render = () => {
      if (!active || !initialized || disposed || !texture || !program || !buffer || !uniforms) return;
      const bounds = root.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uniforms.resolution, width, height);
      gl.uniform2f(uniforms.imageResolution, image.naturalWidth, image.naturalHeight);
      gl.uniform2f(uniforms.viewport, window.innerWidth, window.innerHeight);
      gl.uniform2f(uniforms.rect, bounds.top, bounds.height);
      gl.uniform1i(uniforms.image, 0);
      gl.uniform1f(uniforms.fit, fit === 'cover' ? 0 : 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const uploadImage = () => {
      if (!texture || !image.complete || !image.naturalWidth) return;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      if (initialized) scheduleRender();
    };

    const initialize = () => {
      if (initialized || failed || disposed || !active || !image.complete || !image.naturalWidth) return;

      try {
        program = createProgram(gl);
        buffer = gl.createBuffer();
        texture = gl.createTexture();
        if (!buffer || !texture) throw new Error('WebGL could not allocate pixel dissolve resources.');

        gl.useProgram(program);
        positionLocation = gl.getAttribLocation(program, 'a_position');
        if (positionLocation < 0) throw new Error('The pixel dissolve shader is missing its position attribute.');
        uniforms = {
          resolution: gl.getUniformLocation(program, 'u_resolution'),
          imageResolution: gl.getUniformLocation(program, 'u_imageResolution'),
          viewport: gl.getUniformLocation(program, 'u_viewport'),
          rect: gl.getUniformLocation(program, 'u_rect'),
          image: gl.getUniformLocation(program, 'u_image'),
          fit: gl.getUniformLocation(program, 'u_fit'),
        };
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
          gl.STATIC_DRAW,
        );
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        initialized = true;
        uploadImage();
        canvas.style.opacity = '1';
        image.style.opacity = '0';

        gsap.registerPlugin(ScrollTrigger);
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: scheduleRender,
          onRefresh: scheduleRender,
          onEnter: scheduleRender,
          onEnterBack: scheduleRender,
        });
        scheduleRender();
      } catch (error: unknown) {
        failed = true;
        setFallback();
        console.error(`Unable to initialize the pixel dissolve shader for ${image.currentSrc || image.src}.`, error);
        if (texture) gl.deleteTexture(texture);
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        texture = null;
        buffer = null;
        program = null;
      }
    };

    const handleImageLoad = () => {
      if (!initialized) initialize();
      else uploadImage();
    };
    const handleImageError = () => {
      setFallback();
      console.error(`Failed to load the pixel dissolve image: ${image.currentSrc || image.src}`);
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      failed = true;
      initialized = false;
      setFallback();
      scrollTrigger?.kill();
      scrollTrigger = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          initialize();
          scheduleRender();
        }
      },
      { rootMargin: '20% 240px' },
    );
    const resizeObserver = new ResizeObserver(scheduleRender);
    observer.observe(root);
    resizeObserver.observe(root);
    image.addEventListener('load', handleImageLoad);
    image.addEventListener('error', handleImageError);
    canvas.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('resize', scheduleRender, { passive: true });

    if (image.complete && image.naturalWidth) initialize();

    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      image.removeEventListener('load', handleImageLoad);
      image.removeEventListener('error', handleImageError);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('resize', scheduleRender);
      window.cancelAnimationFrame(frame);
      scrollTrigger?.kill();
      setFallback();
      if (texture) gl.deleteTexture(texture);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [fit, reduceMotion]);

  return (
    <div ref={rootRef} className={cn('relative h-full w-full overflow-hidden', className)}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-150',
          fit === 'contain' && 'object-contain',
          imageClassName,
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-150"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
