'use client';

import { useT } from '@/lib/LangContext';

export default function Strip() {
  const t = useT();

  const items = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      value: '20m',
      label: t('stripBeach'),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <path d="M14 4 L18 12 L26 13 L20 19 L22 27 L14 23 L6 27 L8 19 L2 13 L10 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      value: '8.9',
      label: t('stripRating'),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      value: '9.7',
      label: t('stripStaff'),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="12" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12V8a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="14" cy="18" r="2" fill="currentColor" opacity="0.6" />
        </svg>
      ),
      value: '',
      label: t('stripParking'),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <rect x="5" y="10" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 18h18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <path d="M11 22v2M17 22v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      value: '',
      label: t('stripAc'),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <path d="M4 10c5.5-6.5 14.5-6.5 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.5 13.5c3.6-4 9.4-4 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 17c1.8-2 5.2-2 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="20" r="1.5" fill="currentColor" />
        </svg>
      ),
      value: '',
      label: t('stripWifi'),
    },
  ];

  return (
    <section style={{ background: 'var(--ink)', padding: '0' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
        }}
        className="strip-grid"
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.28rem',
              padding: '0.85rem 0.5rem',
              borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              color: 'var(--white)',
            }}
          >
            <div style={{ color: 'var(--gold)', opacity: 0.85 }}>{item.icon}</div>
            {item.value && (
              <span
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  color: 'var(--gold-lt)',
                  lineHeight: 1,
                }}
              >
                {item.value}
              </span>
            )}
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                opacity: 0.5,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .strip-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .strip-grid > div {
            border-right: 1px solid rgba(255,255,255,0.07) !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .strip-grid > div:nth-child(3n) {
            border-right: none !important;
          }
          .strip-grid > div:nth-child(n+4) {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
