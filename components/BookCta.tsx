'use client';

import { useT } from '@/lib/LangContext';

export default function BookCta() {
  const t = useT();

  return (
    <section
      id="book"
      style={{
        position: 'relative',
        background: 'var(--ink2)',
        padding: '7rem 2rem',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/more.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--ink2) 75%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 60,
          height: 2,
          background: 'var(--gold)',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 620, margin: '0 auto' }}>
        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
          }}
        >
          {t('bookLabel')}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--white)',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            whiteSpace: 'nowrap',
          }}
        >
          {t('bookTitle1')}{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--gold-lt)' }}>
            {t('bookTitle2')}
          </span>
        </h2>

        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '3rem' }}>
          {t('bookPara')}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <a
            href="mailto:info@nine-svetijuraj.hr"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(184,147,90,0.35)',
              borderRadius: 4,
              padding: '1rem 1.5rem',
              color: 'var(--white)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(184,147,90,0.12)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.35)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="5" width="16" height="11" rx="1.5" stroke="var(--gold)" strokeWidth="1.3" />
              <path d="M2 7l8 5 8-5" stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span>info@nine-svetijuraj.hr</span>
          </a>

          <a
            href="tel:+385912345678"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(184,147,90,0.35)',
              borderRadius: 4,
              padding: '1rem 1.5rem',
              color: 'var(--white)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(184,147,90,0.12)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.35)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 3h3l1.5 4-2 1.2c.9 1.8 2.3 3.1 4 4l1.2-2L17 11.5v3C17 15.3 16.3 16 15.5 16 8.1 16 4 11.9 4 4.5 4 3.7 4.7 3 5.5 3z" stroke="var(--gold)" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            <span>+385 91 234 5678</span>
          </a>
        </div>

        <a
          href="https://www.booking.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'var(--gold)',
            color: 'var(--ink)',
            padding: '0.9rem 2.75rem',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontWeight: 500,
            borderRadius: 2,
            transition: 'background 0.25s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = 'var(--gold-lt)')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = 'var(--gold)')}
        >
          {t('bookBtn')}
        </a>
      </div>
    </section>
  );
}
