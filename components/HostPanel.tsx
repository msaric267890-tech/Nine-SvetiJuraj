'use client';

import { useEffect, useRef, useState } from 'react';

const EV_ENC_KEY = 'nine_ev_enc'; // encrypted blob in localStorage

type Screen = 'idle' | 'pin' | 'form' | 'settings' | 'camera' | 'processing';
type SubmitState = 'idle' | 'loading' | 'ok' | 'error';

interface Guest {
  surname: string;
  givenName: string;
  dob: string;
  sex: string;
  docType: string;
  docNumber: string;
  expiry: string;
  nationality: string;
  residenceCountry: string;
  arrivalDate: string;
  departureDate: string;
}

// ── AES-256-GCM helpers (browser Web Crypto) ──────────────────────────────────

const PBKDF2_SALT = new TextEncoder().encode('nine-svetijuraj-2026');

async function deriveKey(pin: string) {
  const raw = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: PBKDF2_SALT, iterations: 100_000, hash: 'SHA-256' },
    raw, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
  );
}

async function encryptStr(plain: string, pin: string): Promise<string> {
  const key = await deriveKey(pin);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plain));
  const buf = new Uint8Array(12 + ct.byteLength);
  buf.set(iv); buf.set(new Uint8Array(ct), 12);
  return btoa(String.fromCharCode(...buf));
}

async function decryptStr(b64: string, pin: string): Promise<string> {
  const key = await deriveKey(pin);
  const buf = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, key, buf.slice(12));
  return new TextDecoder().decode(pt);
}

// ── Date helpers ───────────────────────────────────────────────────────────────

function fmtD(d: Date) {
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

function emptyGuest(): Guest {
  const t = new Date(), tom = new Date(t);
  tom.setDate(t.getDate() + 1);
  return { surname: '', givenName: '', dob: '', sex: 'M', docType: 'P', docNumber: '', expiry: '', nationality: '', residenceCountry: '', arrivalDate: fmtD(t), departureDate: fmtD(tom) };
}

// ── MRZ parser ─────────────────────────────────────────────────────────────────

// OCR frequently swaps 0↔O, 1↔I, 5↔S in numeric fields
function fixDigits(s: string) {
  return s.replace(/O/g, '0').replace(/I/g, '1').replace(/S/g, '5').replace(/B/g, '8').replace(/Z/g, '2');
}

function yymmdd(raw: string, future = false) {
  const s = fixDigits(raw);
  const yy = parseInt(s.slice(0, 2), 10);
  const mm = parseInt(s.slice(2, 4), 10);
  const dd = parseInt(s.slice(4, 6), 10);
  if (isNaN(yy) || isNaN(mm) || isNaN(dd) || mm < 1 || mm > 12 || dd < 1 || dd > 31) return '';
  const yr = future ? (yy < 30 ? 2000 + yy : 1900 + yy) : (yy > 25 ? 1900 + yy : 2000 + yy);
  return `${String(dd).padStart(2,'0')}.${String(mm).padStart(2,'0')}.${yr}`;
}

function clean(s: string) { return s.replace(/</g, ' ').replace(/\s+/g, ' ').trim(); }

// Robust name split: OCR often reads '<<' as 'CC', 'KK', 'GG', etc.
function splitNames(nameField: string): [string, string] {
  // 1. Try exact '<<'
  let idx = nameField.indexOf('<<');
  if (idx > 0) {
    return [nameField.slice(0, idx), nameField.slice(idx + 2).split('<<')[0]];
  }
  // 2. Normalize: treat any non-alpha char as '<', then re-try
  const norm = nameField.replace(/[^A-Z]/g, '<');
  idx = norm.indexOf('<<');
  if (idx > 0) {
    return [norm.slice(0, idx), norm.slice(idx + 2).split('<<')[0]];
  }
  // 3. Detect OCR substitutes for '<<': two consecutive identical non-vowel letters
  const m = nameField.match(/^([A-Z<]+?)([B-DF-HJ-NP-TV-Z])\2([A-Z<]+)/);
  if (m && m[1].length > 0) {
    return [m[1].replace(/<+$/, ''), m[3]];
  }
  // 4. Fallback — can't detect separator
  return ['', nameField];
}

function parseMRZ(raw: string): Partial<Guest> | null {
  const lines = raw.toUpperCase().split('\n')
    .map(l => l.replace(/\s/g, '').replace(/[^A-Z0-9<]/g, ''))
    .filter(l => l.length >= 28);

  const td3 = lines.filter(l => l.length >= 40);
  if (td3.length >= 2) {
    const l1 = td3[0].padEnd(44, '<').slice(0, 44);
    const l2 = td3[1].padEnd(44, '<').slice(0, 44);
    const [sur, giv] = splitNames(l1.slice(5));
    const nat = l2.slice(10, 13).replace(/</g, '');
    return { surname: clean(sur), givenName: clean(giv), dob: yymmdd(l2.slice(13, 19)), sex: l2[20] === 'F' ? 'F' : 'M', docType: 'P', docNumber: fixDigits(l2.slice(0, 9)).replace(/</g, ''), expiry: yymmdd(l2.slice(21, 27), true), nationality: nat, residenceCountry: nat };
  }

  const td1 = lines.filter(l => l.length >= 28 && l.length <= 32);
  if (td1.length >= 3) {
    const l1 = td1[0].padEnd(30, '<'), l2 = td1[1].padEnd(30, '<'), l3 = td1[2].padEnd(30, '<');
    const [sur, giv] = splitNames(l3);
    const nat = l2.slice(15, 18).replace(/</g, '');
    return { surname: clean(sur), givenName: clean(giv), dob: yymmdd(l2.slice(0, 6)), sex: l2[7] === 'F' ? 'F' : 'M', docType: 'I', docNumber: fixDigits(l1.slice(5, 14)).replace(/</g, ''), expiry: yymmdd(l2.slice(8, 14), true), nationality: nat, residenceCountry: nat };
  }
  return null;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function HostPanel() {
  const [screen, setScreen] = useState<Screen>('idle');
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [pinLoading, setPinLoading] = useState(false);
  const [guest, setGuest] = useState<Guest>(emptyGuest());
  const [ocrErr, setOcrErr] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitMsg, setSubmitMsg] = useState('');

  const [evOib, setEvOib] = useState('');
  const [evPass, setEvPass] = useState('');
  const [evConnecting, setEvConnecting] = useState(false);
  const [evStatus, setEvStatus] = useState<'none' | 'ok' | 'err'>('none');

  const pinRef = useRef('');           // PIN kept in memory for crypto ops
  const evSessionRef = useRef<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Auth ───────────────────────────────────────────────────────────────────

  const submitPin = async () => {
    setPinLoading(true); setPinErr('');
    try {
      const res = await fetch('/api/auth/pin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin }) });
      const data = await res.json();
      if (!res.ok) { setPinErr(data.error ?? 'Greška'); setPin(''); return; }

      // PIN correct — keep in memory, decrypt stored credentials
      pinRef.current = pin;
      setPin('');
      const enc = localStorage.getItem(EV_ENC_KEY);
      if (enc) {
        try {
          const json = await decryptStr(enc, pinRef.current);
          const creds = JSON.parse(json);
          setEvOib(creds.oib ?? '');
          setEvPass(creds.pass ?? '');
        } catch { /* no creds or wrong key */ }
      }
      setScreen('form');
    } catch { setPinErr('Greška pri spajanju na server.'); }
    finally { setPinLoading(false); }
  };

  const logout = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    evSessionRef.current = null; setEvStatus('none');
    pinRef.current = '';
    setEvOib(''); setEvPass('');
    setGuest(emptyGuest()); setScreen('idle');
  };

  // ── eVisitor ───────────────────────────────────────────────────────────────

  const evLogin = async () => {
    const r = await fetch('/api/evisitor/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ oib: evOib, password: evPass }) });
    if (!r.ok) return null;
    return (await r.json()).sessionCookies as string ?? null;
  };

  const connectEv = async () => {
    setEvConnecting(true);
    // Encrypt and save credentials
    if (pinRef.current) {
      try {
        const enc = await encryptStr(JSON.stringify({ oib: evOib, pass: evPass }), pinRef.current);
        localStorage.setItem(EV_ENC_KEY, enc);
      } catch { /* crypto error — skip save */ }
    }
    const s = await evLogin();
    setEvConnecting(false);
    if (s) { evSessionRef.current = s; setEvStatus('ok'); }
    else setEvStatus('err');
  };

  const submitGuest = async () => {
    setSubmitState('loading'); setSubmitMsg('');
    let session = evSessionRef.current;
    if (!session) {
      session = await evLogin();
      if (!session) { setSubmitState('error'); setSubmitMsg('Prijava na eVisitor nije uspjela. Provjeri postavke.'); return; }
      evSessionRef.current = session; setEvStatus('ok');
    }

    const call = (cookies: string) => fetch('/api/evisitor/checkin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ guest, sessionCookies: cookies }) });
    let res = await call(session);

    if (res.status === 401) {
      evSessionRef.current = null;
      const fresh = await evLogin();
      if (!fresh) { setSubmitState('error'); setSubmitMsg('Sesija istekla — ponovni login nije uspio.'); return; }
      evSessionRef.current = fresh; res = await call(fresh);
    }

    if (res.ok) { setSubmitState('ok'); setSubmitMsg('Gost uspješno prijavljen na eVisitor.'); }
    else {
      const d = await res.json().catch(() => ({}));
      setSubmitState('error'); setSubmitMsg(d.error ?? `Greška ${res.status}`);
    }
  };

  // ── Camera ─────────────────────────────────────────────────────────────────

  const openCamera = async () => {
    setOcrErr(false); setScreen('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } } });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
    } catch { alert('Kamera nije dostupna.'); setScreen('form'); }
  };

  const stopCamera = () => { streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null; };

  const capture = async () => {
    const v = videoRef.current, c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext('2d')?.drawImage(v, 0, 0);
    stopCamera(); setScreen('processing'); setOcrErr(false);
    try {
      const { createWorker } = await import('tesseract.js');
      const w = await createWorker('eng', 1, {
        workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-simd-lstm.wasm.js',
        logger: () => {},
      });
      await w.setParameters({ tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<' });
      const { data: { text } } = await w.recognize(c);
      await w.terminate();
      const parsed = parseMRZ(text);
      if (parsed) { setGuest(g => ({ ...g, ...parsed })); setSubmitState('idle'); setSubmitMsg(''); }
      else setOcrErr(true);
    } catch { setOcrErr(true); }
    setScreen('form');
  };

  // ── Idle ───────────────────────────────────────────────────────────────────

  if (screen === 'idle') return (
    <button type="button" onClick={() => setScreen('pin')} title="Domaćin"
      style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', width: 36, height: 36, borderRadius: '50%', background: 'transparent', border: '1px solid rgba(184,147,90,0.18)', color: 'rgba(184,147,90,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s, border-color 0.2s', zIndex: 90 }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.6)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(184,147,90,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,147,90,0.18)'; }}>
      <svg width="13" height="15" viewBox="0 0 14 16" fill="none"><rect x="1" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="7" cy="11.5" r="1" fill="currentColor" /></svg>
    </button>
  );

  // ── Overlay ────────────────────────────────────────────────────────────────

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,15,20,0.97)', zIndex: 200, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>

      {/* PIN */}
      {screen === 'pin' && (
        <Center>
          <Card width={340}>
            <svg width="28" height="32" viewBox="0 0 14 16" fill="none" style={{ marginBottom: '1rem', color: 'var(--gold)' }}><rect x="1" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="7" cy="11.5" r="1" fill="currentColor" /></svg>
            <p style={{ ...lbl, textAlign: 'center', marginBottom: '1.5rem' }}>Pristup domaćina</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '1rem', marginTop: '-0.5rem' }}>Unesi lozinku</p>
            <input type="password" placeholder="Lozinka" value={pin}
              onChange={e => { setPin(e.target.value); setPinErr(''); }}
              onKeyDown={e => e.key === 'Enter' && submitPin()} autoFocus
              style={{ ...inp, border: pinErr ? '1px solid #e05252' : '1px solid rgba(184,147,90,0.3)', fontSize: '1rem', marginBottom: '0.5rem' }} />
            {pinErr && <p style={{ color: '#e05252', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{pinErr}</p>}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => { setScreen('idle'); setPin(''); setPinErr(''); }} style={{ ...btnSec, flex: 1 }}>Odustani</button>
              <button type="button" onClick={submitPin} disabled={pinLoading || !pin} style={{ ...btnPri, flex: 1, opacity: pinLoading ? 0.6 : 1 }}>
                {pinLoading ? '...' : 'Potvrdi'}
              </button>
            </div>
          </Card>
        </Center>
      )}

      {/* Registration form */}
      {screen === 'form' && (
        <div style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(1rem, 4vw, 2.5rem)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <p style={lbl}>Prijava gosta · eVisitor</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.2rem', letterSpacing: '0.04em' }}>Objekt 0010329 · Sveti Juraj</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button type="button" onClick={() => setScreen('settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: evStatus === 'ok' ? '#4caf50' : 'var(--muted)', fontSize: '0.72rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: evStatus === 'ok' ? '#4caf50' : evStatus === 'err' ? '#e05252' : 'rgba(255,255,255,0.2)', display: 'inline-block', flexShrink: 0 }} />
                {evStatus === 'ok' ? 'eVisitor spojen' : 'Postavi eVisitor'}
              </button>
              <button type="button" onClick={logout} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.72rem' }}>Odjava</button>
            </div>
          </div>

          {/* Scan button */}
          <button type="button" onClick={openCamera} style={{ width: '100%', background: 'rgba(184,147,90,0.07)', border: '1px dashed rgba(184,147,90,0.35)', borderRadius: 6, padding: '1rem', color: 'var(--gold-lt)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', fontSize: '0.85rem', letterSpacing: '0.07em' }}>
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><rect x="1" y="4" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="11" cy="10.5" r="3.8" stroke="currentColor" strokeWidth="1.4" /><path d="M7 4V3a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 15 3v1" stroke="currentColor" strokeWidth="1.4" /></svg>
            Skeniraj putovnicu ili osobnu iskaznicu
          </button>

          {ocrErr && <Alert color="red" msg="OCR nije prepoznao MRZ zonu. Ponovi skeniranje — MRZ mora biti u kadru i dobro osvijetljen." />}

          {/* Osobni podaci */}
          <Sect title="Osobni podaci" />
          <div style={g2}>
            <F label="Prezime *" value={guest.surname} onChange={v => setGuest(g => ({ ...g, surname: v }))} />
            <F label="Ime *" value={guest.givenName} onChange={v => setGuest(g => ({ ...g, givenName: v }))} />
            <F label="Datum rođenja *" value={guest.dob} onChange={v => setGuest(g => ({ ...g, dob: v }))} placeholder="DD.MM.GGGG" />
            <div>
              <p style={flbl}>Spol *</p>
              <Seg value={guest.sex} onChange={v => setGuest(g => ({ ...g, sex: v }))} opts={[{ v: 'M', l: 'Muško' }, { v: 'F', l: 'Žensko' }]} />
            </div>
          </div>

          {/* Putna isprava */}
          <Sect title="Putna isprava" />
          <div style={{ marginBottom: '0.85rem' }}>
            <p style={flbl}>Vrsta isprave *</p>
            <Seg value={guest.docType} onChange={v => setGuest(g => ({ ...g, docType: v }))} opts={[{ v: 'P', l: 'Putovnica' }, { v: 'I', l: 'Osobna' }, { v: 'V', l: 'Viza' }]} />
          </div>
          <div style={g2}>
            <F label="Broj isprave *" value={guest.docNumber} onChange={v => setGuest(g => ({ ...g, docNumber: v }))} />
            <F label="Vrijedi do" value={guest.expiry} onChange={v => setGuest(g => ({ ...g, expiry: v }))} placeholder="DD.MM.GGGG" />
            <F label="Državljanstvo (ISO 3) *" value={guest.nationality} onChange={v => setGuest(g => ({ ...g, nationality: v.toUpperCase().slice(0, 3) }))} placeholder="npr. HRV, DEU, GBR" />
            <F label="Zemlja boravišta (ISO 3) *" value={guest.residenceCountry} onChange={v => setGuest(g => ({ ...g, residenceCountry: v.toUpperCase().slice(0, 3) }))} placeholder="npr. HRV, DEU" />
          </div>

          {/* Dolazak */}
          <Sect title="Dolazak i odlazak" />
          <div style={g2}>
            <F label="Datum dolaska *" value={guest.arrivalDate} onChange={v => setGuest(g => ({ ...g, arrivalDate: v }))} placeholder="DD.MM.GGGG" />
            <F label="Datum odlaska *" value={guest.departureDate} onChange={v => setGuest(g => ({ ...g, departureDate: v }))} placeholder="DD.MM.GGGG" />
          </div>

          {submitState === 'ok' && <Alert color="green" msg={submitMsg} />}
          {submitState === 'error' && <Alert color="red" msg={submitMsg} />}

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem', marginBottom: '3rem' }}>
            <button type="button" onClick={() => { setGuest(emptyGuest()); setSubmitState('idle'); setSubmitMsg(''); setOcrErr(false); }} style={{ ...btnSec, flex: '1 1 100px' }}>Novi gost</button>
            <button type="button" onClick={() => setScreen('idle')} style={{ ...btnSec, flex: '1 1 80px' }}>Zatvori</button>
            {evOib && evPass ? (
              <button type="button" onClick={submitGuest} disabled={submitState === 'loading'}
                style={{ ...btnPri, flex: '2 1 180px', opacity: submitState === 'loading' ? 0.6 : 1 }}>
                {submitState === 'loading' ? 'Prijavljujem...' : 'Prijavi gosta → eVisitor'}
              </button>
            ) : (
              <button type="button" onClick={() => setScreen('settings')} style={{ ...btnPri, flex: '2 1 180px' }}>Postavi eVisitor pristup</button>
            )}
          </div>
        </div>
      )}

      {/* Settings */}
      {screen === 'settings' && (
        <Center>
          <Card width={440}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <p style={lbl}>eVisitor · Postavke</p>
              <button type="button" onClick={() => setScreen('form')} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.78rem' }}>← Natrag</button>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Isti podaci kao za <a href="https://www.evisitor.hr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-lt)' }}>evisitor.hr</a>.{' '}
              Čuvaju se enkriptirani lokalno — samo tvoj PIN ih može otključati.
            </p>
            <F label="OIB iznajmljivača" value={evOib} onChange={setEvOib} />
            <F label="Lozinka eVisitor" value={evPass} onChange={setEvPass} type="password" />
            {evStatus === 'err' && <p style={{ color: '#ef9a9a', fontSize: '0.75rem', marginBottom: '0.75rem' }}>Prijava nije uspjela — provjeri OIB i lozinku.</p>}
            {evStatus === 'ok' && <p style={{ color: '#81c784', fontSize: '0.75rem', marginBottom: '0.75rem' }}>Spojeno na eVisitor.</p>}
            <button type="button" onClick={connectEv} disabled={evConnecting || !evOib || !evPass}
              style={{ ...btnPri, width: '100%', opacity: evConnecting || !evOib || !evPass ? 0.5 : 1 }}>
              {evConnecting ? 'Spajanje...' : 'Spremi i testiraj vezu'}
            </button>
          </Card>
        </Center>
      )}

      {/* Camera */}
      {screen === 'camera' && (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', gap: '1rem' }}>
          <p style={lbl}>Usmjeri kameru na MRZ zonu dokumenta</p>
          <div style={{ width: '100%', maxWidth: 640, position: 'relative' }}>
            <video ref={videoRef} playsInline muted style={{ width: '100%', borderRadius: 6, background: '#000', display: 'block', maxHeight: '60vh', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '14%', left: '4%', right: '4%', height: '22%', border: '1.5px solid rgba(184,147,90,0.7)', borderRadius: 3, pointerEvents: 'none', boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)' }} />
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textAlign: 'center' }}>Putovnica — 2 reda na dnu · Osobna — 3 reda na poleđini</p>
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: 640 }}>
            <button type="button" onClick={() => { stopCamera(); setScreen('form'); }} style={{ ...btnSec, flex: 1 }}>← Odustani</button>
            <button type="button" onClick={capture} style={{ ...btnPri, flex: 2, fontSize: '0.9rem', padding: '0.9rem' }}>Snimi i očitaj</button>
          </div>
        </div>
      )}

      {/* Processing */}
      {screen === 'processing' && (
        <Center>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, border: '2px solid rgba(184,147,90,0.2)', borderTop: '2px solid var(--gold)', borderRadius: '50%', margin: '0 auto 1.5rem', animation: 'spin 0.9s linear infinite' }} />
            <p style={{ fontSize: '0.85rem', color: 'var(--gold-lt)', letterSpacing: '0.1em' }}>Očitavam dokument…</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Može potrajati nekoliko sekundi</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </Center>
      )}
    </div>
  );
}

// ── Layout helpers ─────────────────────────────────────────────────────────────

function Center({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>{children}</div>;
}
function Card({ children, width }: { children: React.ReactNode; width: number }) {
  return <div style={{ background: '#0d1419', border: '1px solid rgba(184,147,90,0.22)', borderRadius: 8, padding: '2rem', width: `min(${width}px,100%)` }}>{children}</div>;
}
function Sect({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', marginTop: '0.25rem' }}>
      <p style={{ ...lbl, whiteSpace: 'nowrap', margin: 0 }}>{title}</p>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
    </div>
  );
}
function Alert({ color, msg }: { color: 'red' | 'green'; msg: string }) {
  const c = color === 'green' ? { bg: 'rgba(76,175,80,0.1)', border: 'rgba(76,175,80,0.3)', text: '#81c784' } : { bg: 'rgba(224,82,82,0.1)', border: 'rgba(224,82,82,0.3)', text: '#ef9a9a' };
  return <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '0.8rem 1rem', fontSize: '0.8rem', color: c.text, marginBottom: '1rem', lineHeight: 1.6 }}>{msg}</div>;
}
function F({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <p style={flbl}>{label}</p>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inp}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(184,147,90,0.5)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
    </div>
  );
}
function Seg({ value, onChange, opts }: { value: string; onChange: (v: string) => void; opts: { v: string; l: string }[] }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: '0.85rem' }}>
      {opts.map(o => (
        <button key={o.v} type="button" onClick={() => onChange(o.v)}
          style={{ flex: 1, padding: '0.55rem 0.25rem', borderRadius: 3, cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.15s', background: value === o.v ? 'rgba(184,147,90,0.18)' : 'rgba(255,255,255,0.04)', border: value === o.v ? '1px solid rgba(184,147,90,0.45)' : '1px solid rgba(255,255,255,0.1)', color: value === o.v ? 'var(--gold-lt)' : 'var(--muted)' }}>
          {o.l}
        </button>
      ))}
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────────────────────

const lbl: React.CSSProperties = { fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 };
const flbl: React.CSSProperties = { fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(184,147,90,0.7)', margin: '0 0 0.28rem' };
const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, padding: '0.6rem 0.75rem', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.15s' };
const btnPri: React.CSSProperties = { background: 'var(--gold)', border: 'none', color: 'var(--ink)', borderRadius: 4, padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem', letterSpacing: '0.05em', textAlign: 'center' };
const btnSec: React.CSSProperties = { background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--muted)', borderRadius: 4, padding: '0.75rem', cursor: 'pointer', fontSize: '0.82rem', textAlign: 'center' };
const g2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 1rem' };
