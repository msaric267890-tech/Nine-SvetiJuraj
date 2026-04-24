import { NextRequest, NextResponse } from 'next/server';

const EV_API = 'https://www.evisitor.hr/eVisitorRhetos_API';
const FACILITY_CODE = '0010329';

// Convert DD.MM.YYYY → .NET date string eVisitor expects
function toNetDate(ddmmyyyy: string): string {
  const [dd, mm, yyyy] = ddmmyyyy.split('.');
  if (!dd || !mm || !yyyy) return '';
  const ts = Date.UTC(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), 12, 0, 0);
  return `/Date(${ts}+0100)/`;
}

export async function POST(req: NextRequest) {
  try {
    const { guest, sessionCookies } = await req.json();

    // Field names follow Rhetos Croatian eVisitor convention.
    // If the API returns unknown-field errors, swap to English camelCase
    // (TouristSurname, TouristName, DateOfBirth, Gender, DocumentType, etc.)
    const body = {
      SifraObjekta: FACILITY_CODE,
      Prezime: (guest.surname as string).toUpperCase(),
      Ime: (guest.givenName as string).toUpperCase(),
      DatumRodjenja: toNetDate(guest.dob),
      Spol: guest.sex === 'Muški' ? 'M' : 'F',
      VrstaDokumenta: guest.docType ?? 'P',
      BrojDokumenta: (guest.docNumber as string).toUpperCase(),
      Drzavljanstvo: (guest.nationality as string).toUpperCase(),
      DrzavaBoravista: (guest.nationality as string).toUpperCase(),
      DatumDolaska: toNetDate(guest.arrivalDate),
      DatumOdlaska: toNetDate(guest.departureDate),
    };

    const res = await fetch(`${EV_API}/Resources/eVisitor/CheckInTourist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: sessionCookies,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.SystemMessage ?? data?.UserMessage ?? `HTTP ${res.status}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Greška pri slanju podataka na eVisitor' }, { status: 500 });
  }
}
