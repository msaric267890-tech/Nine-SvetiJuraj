const items = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 22h20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    value: '20m',
    label: 'do plaže',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 L18 12 L26 13 L20 19 L22 27 L14 23 L6 27 L8 19 L2 13 L10 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    value: '8.9',
    label: 'Booking ocjena',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: '9.7',
    label: 'osoblje',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="12" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12V8a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="18" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    value: '',
    label: 'parking',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="10" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 18h18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M11 22v2M17 22v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: '',
    label: 'klima',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 10c5.5-6.5 14.5-6.5 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 13.5c3.6-4 9.4-4 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 17c1.8-2 5.2-2 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="20" r="1.5" fill="currentColor" />
      </svg>
    ),
    value: '',
    label: 'besplatni WiFi',
  },
];

export default function Strip() {
  return (
    <section
      style={{
        background: 'var(--ink)',
        padding: '2.5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 2rem',
              borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              color: 'var(--white)',
              minWidth: 120,
            }}
          >
            <div style={{ color: 'var(--gold)', opacity: 0.9 }}>{item.icon}</div>
            {item.value && (
              <span
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.4rem',
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
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.55,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
