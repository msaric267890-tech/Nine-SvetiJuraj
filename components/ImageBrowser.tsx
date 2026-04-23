'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type GalleryImage = {
  src: string;
  alt: string;
};

type ImageBrowserProps = {
  images: GalleryImage[];
};

export default function ImageBrowser({ images }: ImageBrowserProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFullscreenOpen(false);
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [images.length]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/10',
            borderRadius: 4,
            overflow: 'hidden',
            background: 'var(--border)',
          }}
        >
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority={activeIndex === 0}
          />

          <button
            type="button"
            onClick={goPrev}
            aria-label="Prethodna slika"
            style={{
              position: 'absolute',
              left: '0.6rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(18,24,31,0.55)',
              color: 'var(--white)',
              cursor: 'pointer',
              backdropFilter: 'blur(3px)',
            }}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Sljedeća slika"
            style={{
              position: 'absolute',
              right: '0.6rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(18,24,31,0.55)',
              color: 'var(--white)',
              cursor: 'pointer',
              backdropFilter: 'blur(3px)',
            }}
          >
            ›
          </button>

          <button
            type="button"
            onClick={() => setFullscreenOpen(true)}
            style={{
              position: 'absolute',
              right: '0.7rem',
              bottom: '0.7rem',
              border: '1px solid rgba(184,147,90,0.4)',
              background: 'rgba(18,24,31,0.8)',
              color: 'var(--gold-lt)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.4rem 0.65rem',
              cursor: 'pointer',
            }}
          >
            Otvori
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.6rem',
          }}
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: 3,
                overflow: 'hidden',
                border:
                  activeIndex === index
                    ? '2px solid var(--gold)'
                    : '1px solid rgba(18,24,31,0.08)',
                padding: 0,
                cursor: 'pointer',
                opacity: activeIndex === index ? 1 : 0.78,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={80}
                sizes="(max-width: 768px) 24vw, 11vw"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      </div>

      {fullscreenOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(12,18,24,0.95)',
            zIndex: 120,
            display: 'grid',
            placeItems: 'center',
            padding: '1rem',
          }}
        >
          <button
            type="button"
            onClick={() => setFullscreenOpen(false)}
            aria-label="Zatvori preglednik"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: 'var(--white)',
              width: 42,
              height: 42,
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>

          <div
            style={{
              width: 'min(1200px, 100%)',
              aspectRatio: '16/10',
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              background: '#0b1015',
            }}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              quality={92}
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div style={{ marginTop: '0.75rem', color: 'var(--gold-lt)', fontSize: '0.85rem' }}>
            {activeIndex + 1} / {images.length} · {images[activeIndex].alt}
          </div>
        </div>
      )}
    </>
  );
}
