import { NextRequest, NextResponse } from 'next/server';

const EV_API = 'https://www.evisitor.hr/eVisitorRhetos_API';

export async function POST(req: NextRequest) {
  try {
    const { oib, password } = await req.json();

    const res = await fetch(
      `${EV_API}/Resources/AspNetFormsAuth/Authentication/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: oib, password, apikey: '' }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return NextResponse.json(
        { error: 'Neispravni podaci za eVisitor prijavu', detail },
        { status: 401 }
      );
    }

    // Extract all three session cookies (auth, affinity, language)
    const setCookies: string[] =
      typeof (res.headers as any).getSetCookie === 'function'
        ? (res.headers as any).getSetCookie()
        : [res.headers.get('set-cookie') ?? ''].filter(Boolean);

    const sessionCookies = setCookies
      .map((c) => c.split(';')[0].trim())
      .filter(Boolean)
      .join('; ');

    return NextResponse.json({ sessionCookies });
  } catch {
    return NextResponse.json({ error: 'Greška pri spajanju na eVisitor' }, { status: 500 });
  }
}
