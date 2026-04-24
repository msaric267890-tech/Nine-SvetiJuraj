'use client';

import { useEffect, useRef, useState } from 'react';

const HOST_PIN = '1234';
const STORAGE_KEY = 'nine_host_auth';

type Screen = 'idle' | 'pin' | 'panel' | 'camera' | 'processing' | 'result';

interface GuestData {
  surname: string;
  givenName: string;
  docNumber: string;
  nationality: string;
  dob: string;
  sex: string;
  expiry: string;
}

// ── MRZ parser ────────────────────────────────────────────────────────────────

function parseYYMMDD(s: string, futureBias = false): string {
  const yy = parseInt(s.slice(0, 2), 10);
  const mm = s.slice(2, 4);
  const dd = s.slice(4, 6);
  const year = futureBias
    ? yy < 30 ? 2000 + yy : 1900 + yy
    : yy > 25 ? 1900 + yy : 2000 + yy;
  return `${dd}.${mm}.${year}`;
}

function cleanName(s: string) {
  return s.replace(/</g, ' ').replace(/\s+/g, ' ').trim();
}

function parseMRZ(rawText: string): GuestData | null {
  // Normalize: keep only A-Z, 0-9, <, newlines, strip spaces within lines
  const lines = rawText
    .toUpperCase()
    .split('\n')
    .map(l => l.replace(/\s/g, '').replace(/[^A-Z0-9<]/g, ''))
    .filter(l => l.length >= 28);

  // TD3 — passport: 2 lines × 44 chars
  const td3 = lines.filter(l => l.length >= 40);
  if (td3.length >= 2) {
    const l1 = td3[0].padEnd(44, '<').slice(0, 44);
    const l2 = td3[1].padEnd(44, '<').slice(0, 44);
    const [surRaw, givenRaw] = l1.slice(5).split('<<');
    return {
      surname: cleanName(surRaw ?? ''),
      givenName: cleanName(givenRaw ?? ''),
      docNumber: l2.slice(0, 9).replace(/</g, ''),
      nationality: l2.slice(10, 13).replace(/</g, ''),
      dob: parseYYMMDD(l2.slice(13, 19), false),
      sex: l2[20] === 'M' ? 'Muški' : l2[20] === 'F' ? 'Ženski' : '',
      expiry: parseYYMMDD(l2.slice(21, 27), true),
    };
  }

  // TD1 — ID card: 3 lines × 30 chars
  const td1 = lines.filter(l => l.length >= 28 && l.length <= 32);
  if (td1.length >= 3) {
    const l1 = td1[0].padEnd(30, '<');
    const l2 = td1[1].padEnd(30, '<');
    const l3 = td1[2].padEnd(30, '<');
    const [surRaw, givenRaw] = l3.split('<<');
    return {
      surname: cleanName(surRaw ?? ''),
      givenName: cleanName(givenRaw ?? ''),
      docNumber: l1.slice(5, 14).replace(/</g, ''),
      nationality: l2.slice(15, 18).replace(/</g, ''),
      dob: parseYYMMDD(l2.slice(0, 6), false),
      sex: l2[7] === 'M' ? 'Muški' : l2[7] === 'F' ? 'Ženski' : '',
      expiry: parseYYMMDD(l2.slice(8, 14), true),
    };
  }

  return null;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HostPanel() {
  const [screen, setScreen] = useState<Screen>('idle');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [ocrError, setOcrError] = useState(false);
  const [captures, setCaptures] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setScreen('panel');
    }
  }, []);

  // ── Auth ──────────────────────────────────────────────────────────────────

  const submitPin = () => {
    if (pin === HOST_PIN) {
      localStorage.setItem(STORAGE_KEY, '1');
      setPin('');
      setPinError(false);
      setScreen('panel');
    } else {
      setPinError(true);
      setPin('');
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    streamRef.current?.getTracks().forEach(t => t.stop());
    captures.forEach(u => URL.revokeObjectURL(u));
    setCaptures([]);
    setGuest(null);
    setScreen('idle');
  };

  // ── Camera ────────────────────────────────────────────────────────────────

  const openCamera = async () => {
    setScreen('camera');
    setOcrError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
    } catch {
      alert('Kamera nije dostupna.');
      setScreen('panel');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setScreen('panel');
  };

  const captureAndOcr = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);

    // Save image for reference
    canvas.toBlob(blob => {
      if (blob) setCaptures(prev => [...prev, URL.createObjectURL(blob!)]);
    }, 'image/jpeg', 0.95);

    stopCamera();
    setScreen('processing');
    setOcrError(false);

    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng', 1, {
        workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-simd-lstm.wasm.js',
        logger: () => {},
      });
      await worker.setParameters({ tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<' });
      const { data: { text } } = await worker.recognize(canvas);
      await worker.terminate();

      const parsed = parseMRZ(text);
      if (parsed) {
        setGuest(parsed);
        setScreen('result');
      } else {
        setOcrError(true);
        setScreen('result');
      }
    } catch {
      setOcrError(true);
      setScreen('result');
    }
  };

  // ── Trigger (lock icon) ───────────────────────────────────────────────────

  if (screen === 'idle') {
    return (
      <button
        type="button"
        onClick={() => setScreen('pin')}
        title="Domaćin"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem',
          width: 36, height: 36, borderRadius: '50%',
          background: 'transparent', border: '1px solid rgba(184,147,90,0.18)',
          color: 'rgba(184,147,90,0.25)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'color 0.2s, border-color 0.2s', zIndex: 90,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.6)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(184,147,90,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.18)'; }}
      >
        <svg width="13" height="15" viewBox="0 0 14 16" fill="none">
          <rect x="1" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="7" cy="11.5" r="1" fill="currentColor" />
        </svg>
      </button>
    );
  }

  // ── Overlay ───────────────────────────────────────────────────────────────

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(12,18,24,0.93)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>

      {/* PIN */}
      {screen === 'pin' && (
        <div style={{ background: 'var(--ink)', border: '1px solid rgba(184,147,90,0.25)', borderRadius: 6, padding: '2.5rem 2rem', width: 'min(360px,100%)', textAlign: 'center' }}>
          <svg width="28" height="32" viewBox="0 0 14 16" fill="none" style={{ marginBottom: '1rem', color: 'var(--gold)' }}>
            <rect x="1" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="11.5" r="1" fill="currentColor" />
          </svg>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>Pristup domaćina</p>
          <input
            type="password" inputMode="numeric" maxLength={8} placeholder="PIN"
            value={pin}
            onChange={e => { setPin(e.target.value); setPinError(false); }}
            onKeyDown={e => e.key === 'Enter' && submitPin()}
            autoFocus
            style={{
              width: '100%', background: 'rgba(255,255,255,0.05)',
              border: pinError ? '1px solid #e05252' : '1px solid rgba(184,147,90,0.3)',
              borderRadius: 4, padding: '0.75rem 1rem', color: 'var(--white)',
              fontSize: '1.1rem', textAlign: 'center', letterSpacing: '0.3em',
              marginBottom: '0.5rem', outline: 'none', boxSizing: 'border-box',
            }}
          />
          {pinError && <p style={{ color: '#e05252', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Pogrešan PIN</p>}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => { setScreen('idle'); setPin(''); setPinError(false); }}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--muted)', borderRadius: 4, padding: '0.6rem', cursor: 'pointer', fontSize: '0.82rem' }}>
              Odustani
            </button>
            <button type="button" onClick={submitPin}
              style={{ flex: 1, background: 'var(--gold)', border: 'none', color: 'var(--ink)', borderRadius: 4, padding: '0.6rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.82rem' }}>
              Potvrdi
            </button>
          </div>
        </div>
      )}

      {/* Panel */}
      {screen === 'panel' && (
        <div style={{ background: 'var(--ink)', border: '1px solid rgba(184,147,90,0.25)', borderRadius: 6, padding: '2rem', width: 'min(500px,100%)', maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Ploča domaćina</p>
            <button type="button" onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.75rem' }}>Odjavi se</button>
          </div>

          <button type="button" onClick={openCamera}
            style={{
              width: '100%', background: 'rgba(184,147,90,0.1)', border: '1px solid rgba(184,147,90,0.4)',
              borderRadius: 4, padding: '1.25rem', color: 'var(--gold-lt)', cursor: 'pointer',
              fontSize: '0.85rem', letterSpacing: '0.08em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              marginBottom: guest ? '1rem' : '0',
            }}>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect x="1" y="3" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="10" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M6 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Skeniraj dokument (putovnica / osobna)
          </button>

          {/* Previous result summary */}
          {guest && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 4, border: '1px solid rgba(184,147,90,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>Zadnji gost</p>
                <a href="https://www.evisitor.hr" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '0.72rem', color: 'var(--gold-lt)', textDecoration: 'none', letterSpacing: '0.06em', border: '1px solid rgba(184,147,90,0.3)', borderRadius: 3, padding: '0.3rem 0.6rem' }}>
                  Otvori eVisitor →
                </a>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--white)', margin: 0 }}>{guest.surname} {guest.givenName}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: '0.2rem 0 0' }}>{guest.dob} · {guest.nationality} · {guest.docNumber}</p>
            </div>
          )}

          <button type="button" onClick={() => setScreen('idle')}
            style={{ width: '100%', marginTop: '1.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', borderRadius: 4, padding: '0.6rem', cursor: 'pointer', fontSize: '0.8rem' }}>
            Zatvori
          </button>
        </div>
      )}

      {/* Camera */}
      {screen === 'camera' && (
        <div style={{ width: 'min(700px,100%)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ textAlign: 'center', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>
            Usmjeri kameru na MRZ zone dokumenta (donji dio putovnice)
          </p>
          <video ref={videoRef} playsInline muted style={{ width: '100%', borderRadius: 4, background: '#000', display: 'block' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* MRZ guide overlay hint */}
          <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
            Putovnica: 2 reda slova/brojeva na dnu · Osobna: 3 reda na poleđini
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" onClick={stopCamera}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 4, padding: '0.85rem', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← Natrag
            </button>
            <button type="button" onClick={captureAndOcr}
              style={{ flex: 2, background: 'var(--gold)', border: 'none', color: 'var(--ink)', borderRadius: 4, padding: '0.85rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Snimi i očitaj dokument
            </button>
          </div>
        </div>
      )}

      {/* Processing */}
      {screen === 'processing' && (
        <div style={{ textAlign: 'center', color: 'var(--white)' }}>
          <div style={{ width: 48, height: 48, border: '2px solid rgba(184,147,90,0.3)', borderTop: '2px solid var(--gold)', borderRadius: '50%', margin: '0 auto 1.5rem', animation: 'spin 0.9s linear infinite' }} />
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--gold-lt)' }}>Očitavam dokument…</p>
          <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Tesseract OCR obrada</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Result */}
      {screen === 'result' && (
        <div style={{ background: 'var(--ink)', border: '1px solid rgba(184,147,90,0.25)', borderRadius: 6, padding: '2rem', width: 'min(520px,100%)', maxHeight: '90vh', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>
            {ocrError || !guest ? 'Očitavanje dokumenta' : 'Podaci gosta'}
          </p>

          {ocrError || !guest ? (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                OCR nije prepoznao MRZ zone. Pokušaj ponovo s boljim osvjetljenjem ili drži dokument ravno ispred kamere.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setScreen('panel')}
                  style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--muted)', borderRadius: 4, padding: '0.7rem', cursor: 'pointer', fontSize: '0.82rem' }}>
                  Panel
                </button>
                <button type="button" onClick={openCamera}
                  style={{ flex: 1, background: 'var(--gold)', border: 'none', color: 'var(--ink)', borderRadius: 4, padding: '0.7rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.82rem' }}>
                  Pokušaj ponovo
                </button>
              </div>
            </div>
          ) : (
            <GuestForm guest={guest} onEdit={setGuest} onBack={() => setScreen('panel')} onRescan={openCamera} />
          )}
        </div>
      )}
    </div>
  );
}

// ── Guest form with editable fields ──────────────────────────────────────────

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <label style={{ display: 'block', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3, padding: '0.55rem 0.75rem', color: 'var(--white)', fontSize: '0.9rem',
          outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(184,147,90,0.5)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
      />
    </div>
  );
}

function GuestForm({ guest, onEdit, onBack, onRescan }: { guest: GuestData; onEdit: (g: GuestData) => void; onBack: () => void; onRescan: () => void }) {
  const update = (key: keyof GuestData) => (val: string) => onEdit({ ...guest, [key]: val });

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
        <Field label="Prezime" value={guest.surname} onChange={update('surname')} />
        <Field label="Ime" value={guest.givenName} onChange={update('givenName')} />
        <Field label="Datum rođenja" value={guest.dob} onChange={update('dob')} />
        <Field label="Spol" value={guest.sex} onChange={update('sex')} />
        <Field label="Broj dokumenta" value={guest.docNumber} onChange={update('docNumber')} />
        <Field label="Državljanstvo" value={guest.nationality} onChange={update('nationality')} />
      </div>
      <Field label="Vrijedi do" value={guest.expiry} onChange={update('expiry')} />

      <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(184,147,90,0.08)', borderRadius: 4, border: '1px solid rgba(184,147,90,0.2)', fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        Provjeri podatke, ispravi ako treba, pa otvori eVisitor i unesi ručno.
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={onBack}
          style={{ flex: 1, minWidth: 100, background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--muted)', borderRadius: 4, padding: '0.7rem', cursor: 'pointer', fontSize: '0.82rem' }}>
          ← Panel
        </button>
        <button type="button" onClick={onRescan}
          style={{ flex: 1, minWidth: 100, background: 'transparent', border: '1px solid rgba(184,147,90,0.3)', color: 'var(--gold-lt)', borderRadius: 4, padding: '0.7rem', cursor: 'pointer', fontSize: '0.82rem' }}>
          Novi gost
        </button>
        <a href="https://www.evisitor.hr" target="_blank" rel="noopener noreferrer"
          style={{
            flex: 2, minWidth: 140, background: 'var(--gold)', color: 'var(--ink)',
            borderRadius: 4, padding: '0.7rem 1rem', fontWeight: 500, fontSize: '0.82rem',
            letterSpacing: '0.06em', textDecoration: 'none', textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}>
          Otvori eVisitor
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </>
  );
}
