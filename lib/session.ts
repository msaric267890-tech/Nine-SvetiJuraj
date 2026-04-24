// Edge-compatible session verification (Web Crypto API — no Node imports)
// Token format: {tsHex}.{hmacSHA256Hex} — same algo as node:crypto createHmac('sha256')

const EXPIRY_MS = 12 * 60 * 60 * 1000;

function fromHex(hex: string) {
  const a = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) a[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  return a;
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret || 'fallback'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
}

export async function verifySession(token: string, secret: string): Promise<boolean> {
  try {
    const dot = token.indexOf('.');
    if (dot < 0) return false;
    const ts = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (!ts || !sig) return false;
    if (Date.now() - parseInt(ts, 16) > EXPIRY_MS) return false;
    const key = await hmacKey(secret);
    return crypto.subtle.verify('HMAC', key, fromHex(sig), new TextEncoder().encode(ts));
  } catch {
    return false;
  }
}
