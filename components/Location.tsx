'use client';

import { useT } from '@/lib/LangContext';
import TerrainRelief from './TerrainRelief';

export default function Location() {
  const t = useT();

  const distances = [
    { key: 'distBeach',   distance: '20 m',   icon: '🏖' },
    { key: 'distKonoba',  distance: '50 m',   icon: '🍽' },
    { key: 'distVelebit', distance: '2 km',   icon: '🌿' },
    { key: 'distHuts',    distance: '8 km',   icon: '🏕' },
    { key: 'distVratnik', distance: '13 km',  icon: '⛰' },
    { key: 'distNatPark', distance: '19 km',  icon: '🏔' },
    { key: 'distSenj',    distance: '15 km',  icon: '🏙' },
    { key: 'distRijeka',  distance: '61 km',  icon: '✈' },
  ] as const;

  return (
    <section id="location" style={{ background: 'var(--ink)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem', textAlign: 'center' }}>
          {t('locationLabel')}
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
          {t('locationTitle')}
        </h2>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}
          className="location-grid"
        >
          {/* 3D terrain */}
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
                pointerEvents: 'none',
              }}
            >
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.15rem' }}>
                {t('locationRelief')}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
                Velebitsko primorje
              </p>
            </div>
          </div>

          {/* Text + distances */}
          <div>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.9rem', lineHeight: 1.7 }}>
              {t('locationPara1')}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              {t('locationPara2')}
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {distances.map(({ key, distance, icon }) => (
                  <tr key={key} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <td
                      style={{
                        padding: '0.65rem 0',
                        color: 'var(--white)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                      }}
                    >
                      <span style={{ opacity: 0.7 }}>{icon}</span>
                      {t(key)}
                    </td>
                    <td
                      style={{
                        padding: '0.65rem 0',
                        textAlign: 'right',
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1.05rem',
                        color: 'var(--gold-lt)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {distance}
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
