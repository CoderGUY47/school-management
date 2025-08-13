"use client";

import React from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import TeacherCard, { Teacher } from '@/app/components/TeacherCard';

const allTeachers: Teacher[] = [
  { id: 1, name: 'Dr. Robert Smith', email: 'r.smith@email.com', subject: 'Mathematics', students: 45, rating: 4.8, experience: '8 years', avatar: '/images/teacher1.jpg' },
  { id: 2, name: 'Prof. Maria Garcia', email: 'm.garcia@email.com', subject: 'Physics', students: 38, rating: 4.9, experience: '12 years', avatar: '/images/teacher1.jpg' },
  { id: 3, name: 'Dr. James Wilson', email: 'j.wilson@email.com', subject: 'Chemistry', students: 42, rating: 4.7, experience: '6 years', avatar: '/images/teacher1.jpg' },
  { id: 4, name: 'Prof. Anna Lee', email: 'a.lee@email.com', subject: 'Biology', students: 35, rating: 4.6, experience: '10 years', avatar: '/images/teacher1.jpg' },
  { id: 5, name: 'Dr. Emily Davis', email: 'e.davis@email.com', subject: 'English', students: 40, rating: 4.5, experience: '7 years', avatar: '/images/teacher1.jpg' },
  { id: 6, name: 'Prof. Michael Chen', email: 'm.chen@email.com', subject: 'History', students: 37, rating: 4.6, experience: '9 years', avatar: '/images/teacher1.jpg' },
  { id: 7, name: 'Dr. David Wilson', email: 'd.wilson@email.com', subject: 'Geography', students: 33, rating: 4.4, experience: '5 years', avatar: '/images/teacher1.jpg' },
  { id: 8, name: 'Prof. Lisa Brown', email: 'l.brown@email.com', subject: 'Computer', students: 50, rating: 4.9, experience: '11 years', avatar: '/images/teacher1.jpg' },
  { id: 9, name: 'Dr. Ahmed Khan', email: 'a.khan@email.com', subject: 'Mathematics', students: 48, rating: 4.7, experience: '10 years', avatar: '/images/teacher1.jpg' },
  { id: 10, name: 'Prof. Sophia Rossi', email: 's.rossi@email.com', subject: 'Physics', students: 36, rating: 4.5, experience: '6 years', avatar: '/images/teacher1.jpg' },
  { id: 11, name: 'Dr. Chen Li', email: 'c.li@email.com', subject: 'Chemistry', students: 41, rating: 4.6, experience: '8 years', avatar: '/images/teacher1.jpg' },
  { id: 12, name: 'Prof. Amina Ali', email: 'a.ali@email.com', subject: 'Biology', students: 39, rating: 4.8, experience: '9 years', avatar: '/images/teacher1.jpg' },
  { id: 13, name: 'Dr. John Miller', email: 'j.miller@email.com', subject: 'English', students: 44, rating: 4.3, experience: '4 years', avatar: '/images/teacher1.jpg' },
  { id: 14, name: 'Prof. Nadia Petrova', email: 'n.petrova@email.com', subject: 'History', students: 29, rating: 4.2, experience: '3 years', avatar: '/images/teacher1.jpg' },
];

export default function TeachersPage() {
  const pageSize = 6;
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(allTeachers.length / pageSize);
  const start = (page - 1) * pageSize;
  const teachers = allTeachers.slice(start, start + pageSize);

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="mb-8 mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight">Our Teachers</h1>
        <p className="text-sm text-gray-600 mt-1">Experienced, dedicated, and ready to inspire.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t) => (
          <TeacherCard key={t.id} teacher={t} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            className="px-3 py-2 text-sm rounded border hover:bg-white/70 disabled:opacity-50 inline-flex items-center gap-2"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <LuArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
          <div className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </div>
          <button
            className="px-3 py-2 text-sm rounded border hover:bg-white/70 disabled:opacity-50 inline-flex items-center gap-2"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <span>Next</span>
            <LuArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </main>
  );
}


