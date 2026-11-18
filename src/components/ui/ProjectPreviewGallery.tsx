import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { PixelDissolveImage } from './PixelDissolveImage';

interface ProjectPreviewGalleryProps {
  images: string[];
  title: string;
  fit?: 'cover' | 'contain';
  imageClassName?: string;
  className?: string;
  autoAdvanceOnHover?: boolean;
  showIndicators?: boolean;
  isHovered?: boolean;
  pixelDissolve?: boolean;
}

export function ProjectPreviewGallery({
  images,
  title,
  fit = 'cover',
  imageClassName,
  className,
  autoAdvanceOnHover = true,
  showIndicators = true,
  isHovered: isHoveredExternally,
  pixelDissolve = false,
}: ProjectPreviewGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imageKey = images.join('\0');
  const shouldAdvance = isHoveredExternally ?? isHovered;

  useEffect(() => {
    setActiveIndex(0);
  }, [imageKey]);

  useEffect(() => {
    if (!shouldAdvance) {
      setActiveIndex(0);
      return;
    }
    if (!autoAdvanceOnHover || images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, [autoAdvanceOnHover, images.length, shouldAdvance]);

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.length > 0 ? (
        pixelDissolve ? (
          <PixelDissolveImage
            src={images[activeIndex]}
            alt={`${title} preview ${activeIndex + 1}`}
            fit={fit}
            imageClassName={imageClassName}
          />
        ) : (
          <img
            src={images[activeIndex]}
            alt={`${title} preview ${activeIndex + 1}`}
            className={cn(
              'h-full w-full transition-opacity duration-500',
              fit === 'contain' ? 'object-contain' : 'object-cover',
              imageClassName
            )}
          />
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-neutral-400">
          Preview unavailable
        </div>
      )}

      {showIndicators && images.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setActiveIndex(index);
              }}
              aria-label={`Show ${title} preview ${index + 1}`}
              aria-current={index === activeIndex}
              className="group flex h-8 w-8 items-center justify-center bg-transparent"
              style={{ border: 0, borderRadius: 0, boxShadow: 'none', transform: 'none', padding: 0 }}
            >
              <span
                className={cn(
                  'h-1.5 rounded-full bg-white shadow transition-all',
                  index === activeIndex ? 'w-5 opacity-100' : 'w-1.5 opacity-60 group-hover:opacity-100'
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
