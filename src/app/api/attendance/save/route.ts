import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, classId, section, statuses } = body || {};
    if (!date || !classId || !section || !statuses || typeof statuses !== 'object') {
      return NextResponse.json({ error: 'date, classId, section, statuses required' }, { status: 400 });
    }

    const res = await fetch('http://localhost:4000/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, classId, section, statuses }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Cache server error' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';


