// Edge-compatible session utils (Web Crypto API only — no Node imports)

const EXPIRY_MS = 12 * 60 * 60 * 1000; // 12 h

function toHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex: string) {
  const a = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) a[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  return a;
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signSession(secret: string): Promise<string> {
  const ts = Date.now().toString(16);
  const key = await hmacKey(secret);
  const sig = toHex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ts)));
  return `${ts}.${sig}`;
}

export async function verifySession(token: string, secret: string): Promise<boolean> {
  try {
    const [ts, sig] = token.split('.');
    if (!ts || !sig) return false;
    if (Date.now() - parseInt(ts, 16) > EXPIRY_MS) return false;
    const key = await hmacKey(secret);
    return crypto.subtle.verify('HMAC', key, fromHex(sig), new TextEncoder().encode(ts));
  } catch {
    return false;
  }
}
