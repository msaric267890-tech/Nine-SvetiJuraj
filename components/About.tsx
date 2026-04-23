'use client';

import PhotoGrid from '@/components/PhotoGrid';

const amenities = [
  'Pet klimatiziranih soba',
  'Privatna kupaonica u svakoj sobi',
  'Pogled na more iz svake sobe',
  'Plaža oko 20 m od ulaza',
  'Besplatni parking',
  'Besplatni WiFi',
  'Ručnici i posteljina uključeni',
  'Mirna lokacija bez gužve',
];

const galleryImages = [
  { src: '/images/more.jpg', alt: 'Pogled na more' },
  { src: '/images/objekt.jpg', alt: 'Objekt Nine' },
  { src: '/images/view1.jpg', alt: 'Pogled s terase' },
  { src: '/images/ulaz.jpg', alt: 'Ulaz' },
  { src: '/images/panorama.jpg', alt: 'Panorama mjesta' },
  { src: '/images/okolica.jpg', alt: 'Okolica Svetog Jurja' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--off)',
        padding: '6rem 2rem',
      }}
    >
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
        {/* Gallery left */}
        <PhotoGrid images={galleryImages} />

        {/* Text right */}
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
            O smještaju
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
            O objektu
          </h2>

          <p
            style={{
              fontSize: '0.97rem',
              lineHeight: 1.85,
              color: 'var(--muted)',
              marginBottom: '1.2rem',
            }}
          >
            Objekt Nine nalazi se u Svetom Jurju, malom primorskom mjestu na Kvarneru.
            Pet klimatiziranih soba s privatnom kupaonicom, svaka s pogledom prema moru.
            Plaža je dvadesetak metara od ulaza.
          </p>

          <p
            style={{
              fontSize: '0.97rem',
              lineHeight: 1.85,
              color: 'var(--muted)',
              marginBottom: '2.5rem',
            }}
          >
            Besplatan parking uz objekt. WiFi u svim sobama.
            Ručnici i posteljina uključeni.
          </p>

          {/* Amenities checklist */}
          <ul
            style={{
              listStyle: 'none',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.6rem 1rem',
            }}
          >
            {amenities.map((item) => (
              <li
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  lineHeight: 1.5,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: 3 }}
                >
                  <circle cx="7" cy="7" r="6.5" stroke="var(--gold)" />
                  <path
                    d="M4 7l2 2 4-4"
                    stroke="var(--gold)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
