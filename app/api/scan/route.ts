import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const key = process.env.GOOGLE_VISION_KEY ?? '';
  if (!key) return NextResponse.json({ error: 'GOOGLE_VISION_KEY nije postavljen' }, { status: 500 });

  let body: { image?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Neispravan zahtjev' }, { status: 400 });
  }

  const base64 = (body.image ?? '').replace(/^data:image\/\w+;base64,/, '');
  if (!base64) return NextResponse.json({ error: 'Nema slike' }, { status: 400 });

  const res = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [{
          image: { content: base64 },
          features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          imageContext: { languageHints: ['en'] },
        }],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('[Vision API]', res.status, err);
    return NextResponse.json({ error: `Vision API greška ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  const text: string = data.responses?.[0]?.fullTextAnnotation?.text ?? '';

  return NextResponse.json({ text });
}
