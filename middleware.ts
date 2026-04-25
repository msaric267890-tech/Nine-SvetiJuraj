import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('nine_session')?.value;
  const secret = process.env.SESSION_SECRET ?? '';

  if (!token || !(await verifySession(token, secret))) {
    return NextResponse.json({ error: 'Neautoriziran pristup' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/evisitor/:path*', '/api/scan/:path*'],
};
