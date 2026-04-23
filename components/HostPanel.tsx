'use client';

import { useEffect, useRef, useState } from 'react';

// Change this PIN to whatever you want
const HOST_PIN = '1234';
const STORAGE_KEY = 'nine_host_auth';

type Screen = 'idle' | 'pin' | 'panel' | 'camera';

export default function HostPanel() {
  const [screen, setScreen] = useState<Screen>('idle');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [captures, setCaptures] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setScreen('panel');
    }
  }, []);

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
    setScreen('idle');
    captures.forEach((url) => URL.revokeObjectURL(url));
    setCaptures([]);
  };

  const openCamera = async () => {
    setScreen('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      alert('Kamera nije dostupna.');
      setScreen('panel');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setScreen('panel');
  };

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setCaptures((prev) => [...prev, url]);
    }, 'image/jpeg', 0.95);
  };

  const downloadCapture = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `dokument-${index + 1}.jpg`;
    a.click();
  };

  if (screen === 'idle') {
    return (
      <button
        type="button"
        onClick={() => setScreen('pin')}
        title="Domaćin"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(184,147,90,0.2)',
          color: 'rgba(184,147,90,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s, color 0.2s',
          zIndex: 90,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.6)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = 'rgba(184,147,90,0.3)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.2)';
        }}
      >
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <rect x="1" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="7" cy="11.5" r="1" fill="currentColor" />
        </svg>
      </button>
    );
  }

  const overlay = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12,18,24,0.92)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* PIN screen */}
      {screen === 'pin' && (
        <div
          style={{
            background: 'var(--ink)',
            border: '1px solid rgba(184,147,90,0.25)',
            borderRadius: 6,
            padding: '2.5rem 2rem',
            width: 'min(360px, 100%)',
            textAlign: 'center',
          }}
        >
          <svg width="28" height="32" viewBox="0 0 14 16" fill="none" style={{ marginBottom: '1rem', color: 'var(--gold)' }}>
            <rect x="1" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="11.5" r="1" fill="currentColor" />
          </svg>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>
            Pristup domaćina
          </p>
          <input
            type="password"
            inputMode="numeric"
            maxLength={8}
            placeholder="PIN"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setPinError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && submitPin()}
            autoFocus
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: pinError ? '1px solid #e05252' : '1px solid rgba(184,147,90,0.3)',
              borderRadius: 4,
              padding: '0.75rem 1rem',
              color: 'var(--white)',
              fontSize: '1.1rem',
              textAlign: 'center',
              letterSpacing: '0.3em',
              marginBottom: '0.5rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {pinError && (
            <p style={{ color: '#e05252', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Pogrešan PIN</p>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => { setScreen('idle'); setPin(''); setPinError(false); }}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--muted)', borderRadius: 4, padding: '0.6rem', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              Odustani
            </button>
            <button
              type="button"
              onClick={submitPin}
              style={{ flex: 1, background: 'var(--gold)', border: 'none', color: 'var(--ink)', borderRadius: 4, padding: '0.6rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.82rem' }}
            >
              Potvrdi
            </button>
          </div>
        </div>
      )}

      {/* Host panel */}
      {screen === 'panel' && (
        <div
          style={{
            background: 'var(--ink)',
            border: '1px solid rgba(184,147,90,0.25)',
            borderRadius: 6,
            padding: '2rem',
            width: 'min(480px, 100%)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Ploča domaćina
            </p>
            <button type="button" onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.06em' }}>
              Odjavi se
            </button>
          </div>

          <button
            type="button"
            onClick={openCamera}
            style={{
              width: '100%',
              background: 'rgba(184,147,90,0.12)',
              border: '1px solid rgba(184,147,90,0.4)',
              borderRadius: 4,
              padding: '1.25rem',
              color: 'var(--gold-lt)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect x="1" y="3" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="10" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M6 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Skeniraj dokument
          </button>

          {captures.length > 0 && (
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                Snimljeni dokumenti ({captures.length})
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {captures.map((url, i) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => downloadCapture(url, i)}
                    style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(184,147,90,0.2)', padding: 0, cursor: 'pointer', background: '#0b1015' }}
                    title={`Preuzmi dokument ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Dokument ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1', (e.currentTarget.style.background = 'rgba(0,0,0,0.5)'))}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0', (e.currentTarget.style.background = 'rgba(0,0,0,0)'))}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3v10M5 8l5 5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 16h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setScreen('idle')}
            style={{ width: '100%', marginTop: '1.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', borderRadius: 4, padding: '0.6rem', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            Zatvori
          </button>
        </div>
      )}

      {/* Camera screen */}
      {screen === 'camera' && (
        <div
          style={{
            width: 'min(700px, 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <video
            ref={videoRef}
            playsInline
            muted
            style={{ width: '100%', borderRadius: 4, background: '#000', display: 'block' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={stopCamera}
              style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 4, padding: '0.85rem', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              ← Natrag
            </button>
            <button
              type="button"
              onClick={capture}
              style={{
                flex: 2,
                background: 'var(--gold)',
                border: 'none',
                color: 'var(--ink)',
                borderRadius: 4,
                padding: '0.85rem',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
              }}
            >
              Snimi dokument
            </button>
          </div>
          {captures.length > 0 && (
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--gold-lt)' }}>
              {captures.length} {captures.length === 1 ? 'snimka' : 'snimke'} — preuzmi u ploči domaćina
            </p>
          )}
        </div>
      )}
    </div>
  );

  return overlay;
}
