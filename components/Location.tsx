const distances = [
  { place: 'Plaža', distance: '20 m', icon: '🏖' },
  { place: 'Centar Svetog Jurja', distance: '300 m', icon: '🏘' },
  { place: 'Senj', distance: '15 km', icon: '🏙' },
  { place: 'Nacionalni park Paklenica', distance: '20 km', icon: '⛰' },
  { place: 'Karlobag', distance: '34 km', icon: '🛣' },
  { place: 'Rijeka (međunarodna luka)', distance: '80 km', icon: '⚓' },
  { place: 'Zagreb', distance: '170 km', icon: '✈' },
  { place: 'Plitvička jezera', distance: '95 km', icon: '🌊' },
];

export default function Location() {
  return (
    <section
      id="location"
      style={{
        background: 'var(--ink)',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.75rem',
            textAlign: 'center',
          }}
        >
          Lokacija
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 300,
            color: 'var(--white)',
            marginBottom: '3.5rem',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Sveti Juraj — Velebitsko primorje
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="location-grid"
        >
          {/* Map / Panorama image */}
          <div
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: 'var(--ink2)',
              position: 'relative',
            }}
          >
            <img
              src="/images/okolica.jpg"
              alt="Sveti Juraj panorama"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: 0.85,
              }}
            />
            {/* Google Maps embed fallback overlay */}
            <a
              href="https://maps.google.com/?q=Sveti+Juraj,+Croatia"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(18,24,31,0.85)',
                color: 'var(--gold-lt)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: 2,
                border: '1px solid rgba(184,147,90,0.3)',
              }}
            >
              Otvori kartu →
            </a>
          </div>

          {/* Distances table */}
          <div>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--muted)',
                letterSpacing: '0.05em',
                marginBottom: '1.5rem',
                lineHeight: 1.7,
              }}
            >
              Sveti Juraj leži između Senja i Karlobaga, na mirnom dijelu kvarnerske obale.
              Okružen borovom šumom i planinom Velebit iza leđa, mjesto je idealno za
              odmor bez gužve.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {distances.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.75rem 0',
                        color: 'var(--white)',
                        fontSize: '0.87rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                      }}
                    >
                      <span style={{ opacity: 0.7 }}>{row.icon}</span>
                      {row.place}
                    </td>
                    <td
                      style={{
                        padding: '0.75rem 0',
                        textAlign: 'right',
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1.05rem',
                        color: 'var(--gold-lt)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.distance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .location-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
