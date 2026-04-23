'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang, useT } from '@/lib/LangContext';
import { langMeta } from '@/lib/i18n';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = useT();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const links = [
    { label: t('navAccommodation'), href: '#about' },
    { label: t('navReviews'), href: '#reviews' },
    { label: t('navLocation'), href: '#location' },
    { label: t('navContact'), href: '#book' },
  ];

  const currentLabel = langMeta.find((l) => l.code === lang)?.label ?? lang;

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
          style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
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
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: language dropdown + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid rgba(184,147,90,0.4)',
                borderRadius: 4,
                background: 'transparent',
                color: 'var(--white)',
                padding: '0.35rem 0.7rem',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {lang}
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  transition: 'transform 0.2s',
                  transform: langOpen ? 'rotate(180deg)' : 'none',
                }}
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            {langOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  background: 'var(--ink)',
                  border: '1px solid rgba(184,147,90,0.25)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  minWidth: 140,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  zIndex: 10,
                }}
              >
                {langMeta.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      width: '100%',
                      padding: '0.55rem 0.9rem',
                      background: lang === l.code ? 'rgba(184,147,90,0.15)' : 'transparent',
                      border: 'none',
                      color: lang === l.code ? 'var(--gold-lt)' : 'var(--white)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      letterSpacing: '0.04em',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', opacity: 0.55, minWidth: 24 }}>{l.code}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
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
              {l.label}
            </a>
          ))}
          {/* Language in mobile menu */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
            {langMeta.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setMenuOpen(false); }}
                style={{
                  background: lang === l.code ? 'var(--gold)' : 'transparent',
                  color: lang === l.code ? 'var(--ink)' : 'var(--white)',
                  border: '1px solid rgba(184,147,90,0.4)',
                  borderRadius: 3,
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.68rem',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                }}
              >
                {l.code}
              </button>
            ))}
          </div>
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
