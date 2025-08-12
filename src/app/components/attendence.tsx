"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
// no redirect; show a toast after save
import { LuArrowLeft } from 'react-icons/lu';

type AttendanceRecord = {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  status: 'present' | 'absent' | 'late';
};

type ApiResponse = {
  date: string;
  classId?: number;
  section?: string;
  students: AttendanceRecord[];
};

type Props = {
  date?: string; // yyyy-mm-dd
  classId?: number; // 1..10
  section?: string; // A..F
  classFilter?: string; // optional text filter
};

// late is treated as absent in the UI; we only toggle present/absent

export default function AttendanceSheet({ date, classId, section, classFilter }: Props) {
  const [selectedDate, setSelectedDate] = useState(
    date || new Date().toISOString().slice(0, 10)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const filtered = useMemo(() => {
    if (!classFilter) return records;
    return records.filter((r) => r.className.toLowerCase().includes(classFilter.toLowerCase()));
  }, [records, classFilter]);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string> = { date: selectedDate };
        if (classId) params.classId = String(classId);
        if (section) params.section = section;
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`/api/attendance?${query}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiResponse = await res.json();
        const resolvedClassId = classId ?? data.classId ?? 1;
        const resolvedSection = (section ?? data.section ?? 'A').toUpperCase();
        const key = `attendance:${selectedDate}:${resolvedClassId}:${resolvedSection}`;

        let merged = data.students;
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem(key);
          if (saved) {
            try {
              const savedStatuses: Record<string, AttendanceRecord['status']> = JSON.parse(saved);
              merged = data.students.map((s) => {
                const st = savedStatuses[s.id] ?? s.status;
                const normalized: 'present' | 'absent' = st === 'present' ? 'present' : 'absent';
                return { ...s, status: normalized } as AttendanceRecord;
              });
            } catch {
              // ignore corrupt saved data
            }
          }
        }
        if (alive) setRecords(
          merged.map((s) => ({
            ...s,
            status: s.status === 'present' ? 'present' : 'absent',
          }))
        );
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : 'Failed to load attendance';
        if (alive) setError(message);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [selectedDate, classId, section]);

  function handleTogglePresent(id: string, presentChecked: boolean) {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: presentChecked ? 'present' : 'absent' } : r))
    );
  }

  function handleMarkAllPresent() {
    setRecords((prev) => prev.map((r) => ({ ...r, status: 'present' })));

  }

  const totals = useMemo(() => {
    const counts = { present: 0, absent: 0 } as Record<'present' | 'absent', number>;
    for (const r of records) {
      if (r.status === 'present') counts.present += 1;
      else counts.absent += 1;
    }
    return counts;
  }, [records]);

  function handleSave(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="w-full space-y-4 text-white">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm text-white"
        >
          <LuArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white">
          <span>Go to Home</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex flex-col">
          <label className="text-sm text-white">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-white/20 bg-white/10 text-white rounded px-3 py-2 text-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <div className="flex-1" />
        {classFilter && (
          <div className="text-sm text-white/80">Class: {classFilter}</div>
        )}
      </div>

      {error && <div className="text-sm text-red-300">{error}</div>}

      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-white">
          Present: <span className="font-medium text-lime-400">{totals.present}</span>
        </div>
        <div className="text-sm text-white">
          Absent: <span className="font-medium text-orange-400">{totals.absent}</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllPresent}
            className="px-3 py-2 text-xs rounded bg-green-600 text-white hover:bg-green-700"
            disabled={loading || records.length === 0}
          >
            Mark all present
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded mt-2 bg-white/5 backdrop-blur">
        <table className="min-w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="text-left px-4 py-2 text-white/80">Roll</th>
              <th className="text-left px-4 py-2 text-white/80">Name</th>
              <th className="text-left px-4 py-2 text-white/80">Class</th>
              <th className="text-left px-4 py-2 text-white/80">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/70">
                  Loading attendance...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/70">
                  No records for this date.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="px-4 py-2 font-mono text-white/90">{r.rollNumber}</td>
                  <td className="px-4 py-2 text-white/90">{r.name}</td>
                  <td className="px-4 py-2 text-white/90">{r.className}</td>
                  <td className="px-4 py-2">
                    <label className="inline-flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={r.status === 'present'}
                        onChange={(e) => handleTogglePresent(r.id, e.target.checked)}
                        className="h-4 w-4 accent-indigo-500"
                      />
                      <span className="text-white/90">Present</span>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={loading || records.length === 0}
        >
          Save
        </button>
        {savedMessage && <span className="text-xs text-green-300">{savedMessage}</span>}
      </div>

      {savedMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg text-sm">
          {savedMessage}
        </div>
      )}
    </div>
  );
}


