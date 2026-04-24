'use client';

import { useT } from '@/lib/LangContext';
import TerrainRelief from './TerrainRelief';

const restaurants = [
  { name: 'Konoba Gušti', dist: '200 m' },
  { name: 'Pizzeria Adria', dist: '250 m' },
];

const beaches = [
  { name: 'Plaža Sveti Juraj', dist: '30 m' },
  { name: 'Plaža Rača', dist: '1,8 km' },
  { name: 'Plaža Kalić', dist: '2,7 km' },
  { name: 'Plaža Vlaška (za pse)', dist: '3,7 km' },
  { name: 'Plaža Voda', dist: '7 km' },
];

const nature = [
  { name: 'Park prirode Velebit', dist: '2 km' },
  { name: 'Planina Vratnik', dist: '13 km' },
  { name: 'NP Sjeverni Velebit', dist: '19 km' },
];

export default function Location() {
  const t = useT();

  const distances = [
    { key: 'distBeach',   distance: '20 m',  icon: '🏖' },
    { key: 'distKonoba',  distance: '50 m',  icon: '🍽' },
    { key: 'distVelebit', distance: '2 km',  icon: '🌿' },
    { key: 'distHuts',    distance: '8 km',  icon: '🏕' },
    { key: 'distVratnik', distance: '13 km', icon: '⛰' },
    { key: 'distNatPark', distance: '19 km', icon: '🏔' },
    { key: 'distSenj',    distance: '15 km', icon: '🏙' },
    { key: 'distRijeka',  distance: '61 km', icon: '✈' },
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

        {/* Terrain + distances */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}
          className="location-grid"
        >
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
            <div style={{ position: 'absolute', bottom: '0.9rem', left: '1rem', pointerEvents: 'none' }}>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.15rem' }}>
                {t('locationRelief')}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
                Velebitsko primorje
              </p>
            </div>
          </div>

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
                    <td style={{ padding: '0.6rem 0', color: 'var(--white)', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ opacity: 0.7 }}>{icon}</span>
                      {t(key)}
                    </td>
                    <td style={{ padding: '0.6rem 0', textAlign: 'right', fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: 'var(--gold-lt)', whiteSpace: 'nowrap' }}>
                      {distance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Okolica — 3 columns */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem', textAlign: 'center' }}>
            {t('nearbyTitle')}
          </p>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
            className="nearby-grid"
          >
            {/* Restaurants */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <path d="M3 2v5a3 3 0 0 0 3 3v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M6 2v4M9 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M13 2c0 0 2 2 2 5s-2 4-2 4v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white)', opacity: 0.7, fontWeight: 400 }}>
                  {t('nearbyRestaurants')}
                </h3>
              </div>
              {restaurants.map((r) => (
                <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.83rem', color: 'var(--white)', opacity: 0.75 }}>{r.name}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--gold-lt)', fontFamily: 'var(--font-cormorant)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{r.dist}</span>
                </div>
              ))}
            </div>

            {/* Beaches */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="13" viewBox="0 0 20 14" fill="none" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <path d="M1 5 C5 1 9 9 13 5 C17 1 19 5 19 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M1 9 C5 5 9 13 13 9 C17 5 19 9 19 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
                </svg>
                <h3 style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white)', opacity: 0.7, fontWeight: 400 }}>
                  {t('nearbyBeaches')}
                </h3>
              </div>
              {beaches.map((b) => (
                <div key={b.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.83rem', color: 'var(--white)', opacity: 0.75 }}>{b.name}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--gold-lt)', fontFamily: 'var(--font-cormorant)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{b.dist}</span>
                </div>
              ))}
            </div>

            {/* Nature */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <svg width="18" height="15" viewBox="0 0 20 16" fill="none" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  <path d="M2 15 L10 2 L18 15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M7 15 L12 7 L17 15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" opacity="0.5" />
                </svg>
                <h3 style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white)', opacity: 0.7, fontWeight: 400 }}>
                  {t('nearbyNature')}
                </h3>
              </div>
              {nature.map((n) => (
                <div key={n.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.83rem', color: 'var(--white)', opacity: 0.75 }}>{n.name}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--gold-lt)', fontFamily: 'var(--font-cormorant)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{n.dist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .location-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .nearby-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
