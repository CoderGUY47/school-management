import AttendanceSheet from '@/app/components/attendence';

export default async function AttendanceByClassSection({
  params,
}: {
  params: Promise<{ classId: string; section: string }>;
}) {
  const { classId, section } = await params;
  const classNum = Number(classId);
  const validClass = Number.isFinite(classNum) ? Math.max(1, Math.min(10, classNum)) : 1;
  const validSection = (section || 'A').toUpperCase();

  return (
    <main className="max-w-5xl mx-auto p-4 sm:p-6 ">
      <h1 className="text-2xl font-semibold mb-2">
        Attendance - Class {validClass} / Section {validSection}
      </h1>
      <p className="text-sm text-white mb-6">Dynamic view by class and section.</p>
      <AttendanceSheet classId={validClass} section={validSection} />
    </main>
  );
}


