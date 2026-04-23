'use client';

import PhotoGrid from '@/components/PhotoGrid';
import { useT } from '@/lib/LangContext';

const galleryImages = [
  { src: '/images/more.jpg', alt: 'Pogled na more' },
  { src: '/images/objekt.jpg', alt: 'Objekt Nine' },
  { src: '/images/view1.jpg', alt: 'Pogled s terase' },
  { src: '/images/ulaz.jpg', alt: 'Ulaz' },
  { src: '/images/panorama.jpg', alt: 'Panorama mjesta' },
  { src: '/images/okolica.jpg', alt: 'Okolica Svetog Jurja' },
];

export default function About() {
  const t = useT();

  const amenityKeys = [
    'amenity0', 'amenity1', 'amenity2', 'amenity3',
    'amenity4', 'amenity5', 'amenity6', 'amenity7',
  ] as const;

  return (
    <section id="about" style={{ background: 'var(--off)', padding: '6rem 2rem' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        <PhotoGrid images={galleryImages} viewAllLabel={t('aboutViewPhotos')} />

        <div>
          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1rem',
            }}
          >
            {t('aboutLabel')}
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            {t('aboutTitle')}
          </h2>

          <p style={{ fontSize: '0.97rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: '1.2rem' }}>
            {t('aboutPara1')}
          </p>

          <p style={{ fontSize: '0.97rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: '2.5rem' }}>
            {t('aboutPara2')}
          </p>

          <ul
            style={{
              listStyle: 'none',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.6rem 1rem',
            }}
          >
            {amenityKeys.map((key) => (
              <li
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  lineHeight: 1.5,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                  <circle cx="7" cy="7" r="6.5" stroke="var(--gold)" />
                  <path d="M4 7l2 2 4-4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
