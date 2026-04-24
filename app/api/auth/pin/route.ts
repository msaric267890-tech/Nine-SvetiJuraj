import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'node:crypto';

const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 5;

function signSession(secret: string): string {
  const ts = Date.now().toString(16);
  const sig = createHmac('sha256', secret || 'fallback').update(ts).digest('hex');
  return `${ts}.${sig}`;
}

export async function POST(req: NextRequest) {
  const secret = process.env.SESSION_SECRET ?? '';
  const correctPin = process.env.HOST_PIN ?? '';

  if (!correctPin) {
    return NextResponse.json({ error: 'HOST_PIN nije postavljen na serveru.' }, { status: 500 });
  }

  // ── Rate limit ─────────────────────────────────────────────────────────────
  const rlRaw = req.cookies.get('nine_rl')?.value ?? '0:0';
  const [cStr, wStr] = rlRaw.split(':');
  let count = parseInt(cStr) || 0;
  let windowStart = parseInt(wStr) || 0;
  const now = Date.now();

  if (now - windowStart > RL_WINDOW_MS) { count = 0; windowStart = now; }

  if (count >= RL_MAX) {
    const waitMin = Math.ceil((RL_WINDOW_MS - (now - windowStart)) / 60_000);
    return NextResponse.json(
      { error: `Previše neuspjelih pokušaja. Pričekaj ${waitMin} min.` },
      { status: 429 }
    );
  }

  // ── PIN / lozinka provjera ─────────────────────────────────────────────────
  let body: { pin?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Neispravan zahtjev.' }, { status: 400 }); }

  if (body.pin !== correctPin) {
    count++;
    const res = NextResponse.json({ error: 'Pogrešna lozinka' }, { status: 401 });
    res.cookies.set('nine_rl', `${count}:${windowStart}`, { httpOnly: true, path: '/', sameSite: 'strict' });
    return res;
  }

  // ── Uspjeh — postavi session cookie ───────────────────────────────────────
  const token = signSession(secret);
  const res = NextResponse.json({ ok: true });

  res.cookies.set('nine_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 12 * 3600,
  });
  res.cookies.set('nine_rl', '0:0', { httpOnly: true, path: '/', sameSite: 'strict' });

  return res;
}
