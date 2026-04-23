'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Img = { src: string; alt: string };

export default function PhotoGrid({ images }: { images: Img[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const extra = Math.max(0, images.length - 5);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((p) => (p !== null ? (p - 1 + images.length) % images.length : 0));
  const next = () =>
    setLightboxIndex((p) => (p !== null ? (p + 1) % images.length : 0));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  return (
    <>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {/* Large image */}
        <button
          type="button"
          onClick={() => open(0)}
          style={{
            position: 'relative',
            aspectRatio: '16/10',
            borderRadius: 4,
            overflow: 'hidden',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'block',
            width: '100%',
          }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            quality={90}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </button>

        {/* 4 small images */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
          }}
        >
          {images.slice(1, 5).map((img, idx) => {
            const realIdx = idx + 1;
            const isLast = idx === 3 && extra > 0;

            return (
              <button
                key={img.src}
                type="button"
                onClick={() => open(realIdx)}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'block',
                  width: '100%',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 25vw, 12vw"
                  style={{ objectFit: 'cover' }}
                />
                {isLast && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(12,18,24,0.72)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1.9rem',
                        color: 'var(--white)',
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      +{extra}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--gold-lt)',
                      }}
                    >
                      fotografija
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* View all button */}
        <button
          type="button"
          onClick={() => open(0)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(184,147,90,0.35)',
            color: 'var(--gold-lt)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.55rem 1rem',
            cursor: 'pointer',
            borderRadius: 2,
            width: '100%',
            transition: 'border-color 0.2s',
          }}
        >
          Pogledaj sve fotografije ({images.length})
        </button>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(12,18,24,0.96)',
            zIndex: 120,
            display: 'grid',
            placeItems: 'center',
            padding: '1rem',
          }}
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Zatvori"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: 'var(--white)',
              width: 42,
              height: 42,
              fontSize: '1.25rem',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            ×
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Prethodna"
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(18,24,31,0.7)',
              color: 'var(--white)',
              fontSize: '1.3rem',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            ‹
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(1100px, 100%)',
              aspectRatio: '16/10',
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              background: '#0b1015',
            }}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              quality={92}
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Sljedeća"
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(18,24,31,0.7)',
              color: 'var(--white)',
              fontSize: '1.3rem',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            ›
          </button>

          {/* Counter */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'var(--gold-lt)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
            }}
          >
            {lightboxIndex + 1} / {images.length} · {images[lightboxIndex].alt}
          </div>
        </div>
      )}
    </>
  );
}
