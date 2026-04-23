const distances = [
  { place: 'Plaža', distance: '20 m', icon: '🏖' },
  { place: 'Centar Svetog Jurja', distance: '300 m', icon: '🏘' },
  { place: 'Park prirode Velebit', distance: '2 km', icon: '⛰' },
  { place: 'Planinski domovi (Velebit)', distance: '8 km', icon: '🏕' },
  { place: 'Velebitski botanički vrt', distance: '18 km', icon: '🌿' },
  { place: 'Senj', distance: '15 km', icon: '🏙' },
  { place: 'Rijeka', distance: '80 km', icon: '⚓' },
  { place: 'Zagreb', distance: '170 km', icon: '✈' },
];

import TerrainRelief from './TerrainRelief';

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
          {/* 3D terrain relief */}
          <div
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: '#12181f',
              position: 'relative',
            }}
          >
            <TerrainRelief />
            <div
              style={{
                position: 'absolute',
                bottom: '0.9rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                pointerEvents: 'none',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '0.15rem',
                  }}
                >
                  3D reljef
                </p>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Velebitsko primorje
                </p>
              </div>
            </div>
          </div>

          {/* Distances table */}
          <div>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--muted)',
                letterSpacing: '0.05em',
                marginBottom: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              Sveti Juraj leži na podnožju Velebita — zaštićene planine koja se uzdiže
              ravno iz mora. Iza kuće počinje divlja priroda: krške visoravni, kanjoni i
              šume koje ljeti postaju dom planinarima, geologima i ljubiteljima tišine.
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--muted)',
                letterSpacing: '0.05em',
                marginBottom: '1.5rem',
                lineHeight: 1.7,
              }}
            >
              Staze za planinarenje dostupne su odmah iz mjesta, a planinski domovi na
              Velebitu udaljeni su svega nekoliko kilometara pješačenjem.
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
