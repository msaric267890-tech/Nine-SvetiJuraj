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
  { src: '/images/146037547.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/158114836.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/262413896.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/262728473.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/262954275.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336893823.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336893889.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336893979.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894148.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894200.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894401.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894612.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894664.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894690.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894732.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894776.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894886.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336894949.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336895029.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336895467.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896197.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896225.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896289.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896375.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896434.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896472.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896586.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896634.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896670.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896724.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896838.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336896921.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336897009.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336897142.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336897203.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899374.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899387.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899420.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899437.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899461.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899552.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899628.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899747.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899782.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899870.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336899994.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336900069.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336900155.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336900229.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336900275.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336901746.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336901806.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336901889.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336901983.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902133.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902230.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902294.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902321.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902383.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902444.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902495.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902545.jpg', alt: 'Nine Sveti Juraj' },
  { src: '/images/336902595.jpg', alt: 'Nine Sveti Juraj' },
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
