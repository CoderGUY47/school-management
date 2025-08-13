"use client";
 
import AttendanceSheet from '@/app/components/attendence';
import Link from 'next/link';
import { useState } from 'react';

export default function TeacherAttendancePage() {
  const [classId, setClassId] = useState<number>(1);
  const [section, setSection] = useState<string>('A');
  const [course, setCourse] = useState<string>('General Studies');
  const teachers: { id: number; name: string }[] = [
    { id: 1, name: 'Dr. Robert Smith' },
    { id: 2, name: 'Prof. Maria Garcia' },
    { id: 3, name: 'Dr. James Wilson' },
    { id: 4, name: 'Prof. Anna Lee' },
    { id: 5, name: 'Dr. Emily Davis' },
    { id: 6, name: 'Prof. Michael Chen' },
    { id: 7, name: 'Dr. David Wilson' },
    { id: 8, name: 'Prof. Lisa Brown' },
  ];

  const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#250c38] via-[#3c225a] to-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-white">
      <h1 className="text-3xl font-bold mb-2 text-center">Teacher Attendance</h1>
      <div className="mb-3">
        <div className="text-sm text-white/80 mb-2">Teachers</div>
      </div>
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="text-sm text-white/80">Class</label>
          <select
            className="block border border-white/20 bg-white/10 text-white rounded px-3 py-2 text-sm backdrop-blur [&>option]:bg-slate-800 [&>option]:text-white"
            value={classId}
            onChange={(e) => setClassId(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/80">Section</label>
          <select
            className="block border border-white/20 bg-white/10 text-white rounded px-3 py-2 text-sm backdrop-blur [&>option]:bg-slate-800 [&>option]:text-white"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            {sections.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/80">Course</label>
          <select
            className="block border border-white/20 bg-white/10 text-white rounded px-3 py-2 text-sm backdrop-blur [&>option]:border-none [&>option]:bg-slate-600 [&>option]:text-white"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {['General Studies','Mathematics','Science','History','English','Computer'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {/* <Link
          href={`/teacher/attendance/${classId}/${section}`}
          className="inline-flex items-center px-4 py-2 rounded bg-white/20 border border-white/20 backdrop-blur text-white text-sm hover:bg-white/30"
        >
          Open in dedicated page
        </Link> */}
      </div>

      <AttendanceSheet classId={classId} section={section} />
      </div>
    </main>
  );
}


