'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useT } from '@/lib/LangContext';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const t = useT();

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-8%',
          backgroundColor: 'var(--ink2)',
          willChange: 'transform',
        }}
      >
        <Image
          src="/images/panorama.jpg"
          alt="Panorama Svetog Jurja"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'contrast(1.03) saturate(1.02)' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(18,24,31,0.55) 0%, rgba(18,24,31,0.3) 50%, rgba(18,24,31,0.75) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          color: 'var(--white)',
          padding: '0 1.5rem',
          maxWidth: 800,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: '0.04em',
            marginBottom: '1.5rem',
          }}
        >
          Nine Sveti Juraj
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            opacity: 0.8,
            marginBottom: '2.5rem',
          }}
        >
          {t('heroTagline')}
        </p>

        <a
          href="#book"
          style={{
            display: 'inline-block',
            background: 'var(--gold)',
            color: 'var(--ink)',
            padding: '0.85rem 2.5rem',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'background 0.25s',
            borderRadius: 2,
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = 'var(--gold-lt)')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = 'var(--gold)')}
        >
          {t('heroCta')}
        </a>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.5,
          color: 'var(--white)',
        }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <rect x="5.5" y="0" width="3" height="8" rx="1.5" fill="currentColor" opacity="0.6" />
          <path d="M7 16 L1 10 M7 16 L13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}
