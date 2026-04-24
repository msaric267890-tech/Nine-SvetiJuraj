export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { signSession } from '@/lib/session';

const RL_WINDOW_MS = 10 * 60 * 1000; // 10 min window
const RL_MAX = 5;                     // max attempts per window

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

  // ── PIN check ──────────────────────────────────────────────────────────────
  const { pin } = await req.json();

  if (pin !== correctPin) {
    count++;
    const res = NextResponse.json({ error: 'Pogrešan PIN' }, { status: 401 });
    res.cookies.set('nine_rl', `${count}:${windowStart}`, { httpOnly: true, path: '/', sameSite: 'strict' });
    return res;
  }

  // ── Success — issue session cookie ─────────────────────────────────────────
  const token = await signSession(secret);
  const res = NextResponse.json({ ok: true });

  res.cookies.set('nine_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 12 * 3600,
  });

  // Reset rate limit on success
  res.cookies.set('nine_rl', '0:0', { httpOnly: true, path: '/', sameSite: 'strict' });

  return res;
}
