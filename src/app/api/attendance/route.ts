import { NextRequest, NextResponse } from 'next/server';

type StudentAttendance = {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  status: 'present' | 'absent' | 'late';
};

function makeDummy(classId: number, section: string): StudentAttendance[] {
  const names = [
    'Alice Johnson', 'Brian Lee', 'Carlos Gomez', 'Diana Patel', 'Evan Smith',
    'Fatima Khan', 'George Brown', 'Hannah Liu', 'Ivan Petrov', 'Julia Kim',
    'Kevin Zhang', 'Laura Martinez', 'Mohammed Ali', 'Nina Rossi', 'Omar Hussein',
    'Priya Sharma', 'Quentin Blake', 'Rita Sousa', 'Samir Gupta', 'Tanya Singh',
    'Uma Das', 'Vikram Rao', 'Wendy Wu', 'Xavier Cruz', 'Yara Haddad', 'Zainab Noor'
  ];
  const classLabel = `Class ${classId}-${section}`;
  return names.slice(0, 20).map((name, i) => ({
    id: `${classId}-${section}-${i + 1}`,
    name,
    rollNumber: `${classId}${section}-${String(i + 1).padStart(3, '0')}`,
    className: classLabel,
    status: i % 7 === 0 ? 'late' : i % 5 === 0 ? 'absent' : 'present',
  }));
}

function getSampleData(date: string, classId?: number, section?: string): StudentAttendance[] {
  const base: StudentAttendance[] = makeDummy(classId ?? 1, (section ?? 'A').toUpperCase());
  if (date.endsWith('2') || date.endsWith('7')) {
    return base.map((s, i) => (i % 2 === 0 ? { ...s, status: 'present' } : { ...s, status: 'absent' }));
  }
  return base;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || new Date().toISOString().slice(0, 10);
  const classIdParam = searchParams.get('classId');
  const sectionParam = searchParams.get('section') || undefined;
  const classId = classIdParam ? Math.max(1, Math.min(10, Number(classIdParam))) : undefined;
  const section = sectionParam ? sectionParam.toUpperCase() : undefined;
  const data = getSampleData(date, classId, section);
  // Merge cached statuses from backend cache server if available
  try {
    const cacheUrl = new URL('http://localhost:4000/attendance');
    cacheUrl.searchParams.set('date', date);
    cacheUrl.searchParams.set('classId', String(classId ?? 1));
    cacheUrl.searchParams.set('section', String(section ?? 'A'));
    const res = await fetch(cacheUrl.toString(), { cache: 'no-store' });
    if (res.ok) {
      const payload = (await res.json()) as { statuses?: Record<string, StudentAttendance['status']> };
      const statuses = payload.statuses || {};
      const merged = data.map((s) => (statuses[s.id] ? { ...s, status: statuses[s.id] } : s));
      return NextResponse.json({ date, classId: classId ?? 1, section: section ?? 'A', students: merged });
    }
  } catch {
    // ignore cache server errors
  }
  return NextResponse.json({ date, classId: classId ?? 1, section: section ?? 'A', students: data });
}

export const runtime = 'nodejs';


