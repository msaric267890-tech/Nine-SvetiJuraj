'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: { HR: 'Smještaj', EN: 'Rooms', DE: 'Zimmer' }, href: '#about' },
  { label: { HR: 'Recenzije', EN: 'Reviews', DE: 'Bewertungen' }, href: '#reviews' },
  { label: { HR: 'Lokacija', EN: 'Location', DE: 'Lage' }, href: '#location' },
  { label: { HR: 'Kontakt', EN: 'Contact', DE: 'Kontakt' }, href: '#book' },
];

type Lang = 'HR' | 'EN' | 'DE';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>('HR');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.35s, box-shadow 0.35s',
        background: scrolled ? 'var(--ink)' : 'transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1.75rem',
            fontWeight: 300,
            color: 'var(--gold)',
            letterSpacing: '0.12em',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          Nine
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
          className="nav-links"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  color: 'var(--white)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  opacity: 0.85,
                  transition: 'opacity 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.opacity = '1';
                  (e.target as HTMLElement).style.color = 'var(--gold-lt)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.opacity = '0.85';
                  (e.target as HTMLElement).style.color = 'var(--white)';
                }}
              >
                {l.label[lang]}
              </a>
            </li>
          ))}
        </ul>

        {/* Language switcher + mobile burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.25rem',
              border: '1px solid rgba(184,147,90,0.4)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {(['HR', 'EN', 'DE'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? 'var(--gold)' : 'transparent',
                  color: lang === l ? 'var(--ink)' : 'var(--white)',
                  border: 'none',
                  padding: '0.3rem 0.55rem',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  fontWeight: lang === l ? 500 : 300,
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              color: 'var(--white)',
            }}
            className="burger-btn"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect y="0" width="22" height="1.5" fill="currentColor" />
              <rect y="7" width="22" height="1.5" fill="currentColor" />
              <rect y="14" width="22" height="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--ink)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '1.25rem 2rem',
          }}
          className="mobile-menu"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {l.label[lang]}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .burger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
