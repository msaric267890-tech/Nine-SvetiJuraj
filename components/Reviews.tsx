'use client';

import { useT } from '@/lib/LangContext';

const reviewData = [
  {
    text: 'Nevjerojatna lokacija, bukvalno na plaži. Osoblje je bilo izuzetno ljubazno i uvijek na raspolaganju. Definitivno se vraćamo!',
    author: 'Marija K.',
    country: 'Slovenija',
    date: 'Srpanj 2024',
    score: 9.2,
  },
  {
    text: 'Mirno, čisto, s pogledom kakav ne možeš nigdje kupiti. Doručak uz zvuk mora. Savršeno za odmor od svega.',
    author: 'Thomas B.',
    country: 'Njemačka',
    date: 'Kolovoz 2024',
    score: 9.5,
  },
  {
    text: 'Autentično primorsko iskustvo. Kamen, more, lokalci. Kuća je potpuno opremljena, sve je bilo besprijekorno.',
    author: 'Ana M.',
    country: 'Hrvatska',
    date: 'Lipanj 2024',
    score: 8.8,
  },
];

function ScoreBar({ score }: { score: number }) {
  return (
    <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', flex: 1 }}>
      <div style={{ height: '100%', width: `${(score / 10) * 100}%`, background: 'var(--gold)', borderRadius: 2 }} />
    </div>
  );
}

export default function Reviews() {
  const t = useT();

  const categories = [
    { key: 'catLocation', score: 9.4 },
    { key: 'catCleanliness', score: 9.1 },
    { key: 'catStaff', score: 9.7 },
    { key: 'catComfort', score: 8.8 },
    { key: 'catValue', score: 8.6 },
    { key: 'catWifi', score: 8.5 },
  ] as const;

  return (
    <section id="reviews" style={{ background: 'var(--white)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5rem', alignItems: 'start', marginBottom: '4rem' }}
          className="reviews-header"
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(4rem, 10vw, 7rem)',
                fontWeight: 300,
                color: 'var(--ink)',
                lineHeight: 1,
              }}
            >
              8.9
            </div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem' }}>
              {t('reviewsOutOf')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>Booking.com</div>
          </div>

          <div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
              {t('reviewsLabel')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--ink)',
                marginBottom: '2rem',
                lineHeight: 1.1,
              }}
            >
              {t('reviewsTitle')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 3rem' }} className="categories-grid">
              {categories.map(({ key, score }) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text)', minWidth: 80 }}>{t(key)}</span>
                  <ScoreBar score={score} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--ink)', minWidth: 28, textAlign: 'right' }}>
                    {score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}
          className="reviews-cards"
        >
          {reviewData.map((r, i) => (
            <div
              key={i}
              style={{
                background: 'var(--off)',
                borderRadius: 4,
                padding: '1.75rem',
                borderTop: '2px solid var(--gold)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'var(--ink)', color: 'var(--gold-lt)', fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem', padding: '0.2rem 0.5rem', borderRadius: 2 }}>
                  {r.score}
                </span>
                <div style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1l1.1 2.3 2.4.4-1.8 1.7.4 2.4L5 6.7 2.9 7.8l.4-2.4L1.5 3.7l2.4-.4z" fill={j < Math.round(r.score / 2) ? 'var(--gold)' : 'var(--border)'} />
                    </svg>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text)', fontStyle: 'italic', flex: 1 }}>
                &ldquo;{r.text}&rdquo;
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--ink)' }}>{r.author}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{r.country}</div>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://www.booking.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--gold)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--gold)',
              paddingBottom: '0.15rem',
            }}
          >
            {t('reviewsAllLink')}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reviews-header { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .reviews-cards { grid-template-columns: 1fr !important; }
          .categories-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
