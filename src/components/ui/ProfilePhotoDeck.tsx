import { useState } from 'react';
import { cn } from '../../utils/cn';

const profilePhotos = [
  '/assets/img/profile/bagus-1.png',
  '/assets/img/profile/bagus-2.png',
  '/assets/img/profile/bagus-3.png',
  '/assets/img/profile/bagus-4.png',
];

const cardOffsets = [
  { x: 0, y: 0, rotation: 0 },
  { x: 12, y: -8, rotation: 4 },
  { x: -12, y: 9, rotation: -4 },
  { x: 19, y: 13, rotation: 7 },
];

const cardOpacity = [1, 0.82, 0.68, 0.54];
const cardBrightness = [1, 0.72, 0.58, 0.46];

export function ProfilePhotoDeck() {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setActivePhoto((current) => (current + 1) % profilePhotos.length)}
      className="profile-photo-deck relative block w-full max-w-sm aspect-[4/5] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mecha-black"
      aria-label={`Profile photo ${activePhoto + 1} of ${profilePhotos.length}. Click to show the next photo.`}
      title="Click to view the next photo"
    >
      {profilePhotos.map((src, index) => {
        const stackPosition = (index - activePhoto + profilePhotos.length) % profilePhotos.length;
        const offset = cardOffsets[stackPosition];
        const filterId = `profile-photo-invert-${index}`;
        const maskId = `profile-photo-mask-${index}`;
        const patternId = `profile-photo-dots-${index}`;

        return (
          <span
            key={src}
            className="absolute inset-0 block overflow-hidden rounded-[14px] border-2 border-black bg-white shadow-[-4px_4px_0_#d4d4d8,-8px_8px_0_#a1a1aa] transition-[transform,opacity] duration-300 ease-out"
            style={{
              zIndex: profilePhotos.length - stackPosition,
              transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotation}deg)`,
              opacity: cardOpacity[stackPosition],
            }}
            aria-hidden="true"
          >
            <img
              src={src}
              alt=""
              className={cn(
                'h-full w-full object-contain object-top grayscale'
              )}
              style={{ filter: `grayscale(1) brightness(${cardBrightness[stackPosition]})` }}
              loading={stackPosition === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
              viewBox="0 0 300 375"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <filter id={filterId} colorInterpolationFilters="sRGB">
                  <feColorMatrix
                    type="matrix"
                    values="
                      -0.2126 -0.7152 -0.0722 0 1
                      -0.2126 -0.7152 -0.0722 0 1
                      -0.2126 -0.7152 -0.0722 0 1
                      0 0 0 1 0
                    "
                  />
                </filter>
                <mask id={maskId}>
                  <image
                    href={src}
                    width="300"
                    height="375"
                    preserveAspectRatio="xMidYMin slice"
                    filter={`url(#${filterId})`}
                  />
                </mask>
                <pattern id={patternId} width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                  <circle cx="1.6" cy="1.6" r="0.9" fill="black" />
                </pattern>
              </defs>
              <rect
                width="300"
                height="375"
                fill={`url(#${patternId})`}
                mask={`url(#${maskId})`}
                opacity="0.72"
              />
            </svg>
          </span>
        );
      })}

      <span className="absolute bottom-3 right-3 z-10 bg-black/70 px-2 py-1 font-mono text-[9px] tracking-widest text-white">
        {String(activePhoto + 1).padStart(2, '0')} / {String(profilePhotos.length).padStart(2, '0')}
      </span>
    </button>
  );
}
