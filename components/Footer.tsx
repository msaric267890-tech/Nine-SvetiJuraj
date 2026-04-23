'use client';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0c1218',
        color: 'var(--white)',
        padding: '4rem 2rem 2rem',
        borderTop: '1px solid rgba(184,147,90,0.2)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3rem',
            marginBottom: '3rem',
          }}
          className="footer-grid"
        >
          {/* Col 1 — Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: 300,
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                marginBottom: '0.75rem',
              }}
            >
              Nine
            </div>
            <p
              style={{
                fontSize: '0.82rem',
                lineHeight: 1.75,
                color: 'var(--muted)',
                marginBottom: '1.25rem',
              }}
            >
              Privatni smještaj uz more<br />
              Sveti Juraj, Hrvatska
              <br />
              <span style={{ color: 'var(--gold-lt)' }}>
                Five rooms. Twenty metres from the sea.
              </span>
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  background: 'var(--ink)',
                  border: '1px solid rgba(184,147,90,0.3)',
                  borderRadius: 2,
                  padding: '0.25rem 0.6rem',
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.1rem',
                  color: 'var(--gold-lt)',
                }}
              >
                8.9
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
                Booking.com
              </span>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              Navigacija
            </h3>
            <ul style={{ listStyle: 'none' }}>
              {[
                { label: 'Smještaj', href: '#about' },
                { label: 'Recenzije', href: '#reviews' },
                { label: 'Lokacija', href: '#location' },
                { label: 'Rezervacija', href: '#book' },
              ].map((l) => (
                <li key={l.href} style={{ marginBottom: '0.5rem' }}>
                  <a
                    href={l.href}
                    style={{
                      color: 'var(--muted)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--gold-lt)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--muted)')
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              Kontakt
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a
                href="mailto:info@nine-svetijuraj.hr"
                style={{
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                }}
              >
                info@nine-svetijuraj.hr
              </a>
              <a
                href="tel:+385912345678"
                style={{
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                }}
              >
                +385 91 234 5678
              </a>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                Sveti Juraj 23, 53270<br />
                Senj, Hrvatska
              </span>
            </div>
          </div>

          {/* Col 4 — Platforms */}
          <div>
            <h3
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              Platforme
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Booking.com', href: 'https://www.booking.com' },
                { label: 'Airbnb', href: 'https://www.airbnb.com' },
              ].map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'var(--gold-lt)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')
                  }
                >
                  {p.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', opacity: 0.6 }}>
            © {year} Nine Sveti Juraj. Sva prava pridržana.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'Privatnost', href: '#' },
              { label: 'Uvjeti', href: '#' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  opacity: 0.55,
                  letterSpacing: '0.05em',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
