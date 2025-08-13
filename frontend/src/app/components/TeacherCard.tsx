"use client";

import Image from 'next/image';
import { LuBookOpen, LuUsers, LuStar, LuMail } from 'react-icons/lu';
import React from 'react';

export type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  students: number;
  rating: number;
  experience: string;
  avatar: string;
};

type Props = {
  teacher: Teacher;
  onViewProfile?: (teacher: Teacher) => void;
  onMessage?: (teacher: Teacher) => void;
};

export default function TeacherCard({ teacher, onViewProfile, onMessage }: Props) {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-600/50 to-blue-400/50 shadow-xl">
      <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl p-5 shadow-lg">
        <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
          <Image
            src={teacher.avatar}
            alt={teacher.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-xl font-semibold">{teacher.name}</div>
          <div className="text-sm font-medium mt-0.5 inline-flex items-center gap-1 text-indigo-700/90">
            <LuBookOpen className="h-4 w-4" />
            <span>{teacher.subject}</span>
          </div>
        </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-white/30 bg-white/30 p-3 flex items-center gap-2 backdrop-blur-sm hover:bg-white/40 transition-colors">
          <LuMail className="h-4 w-4 text-gray-600" />
          <span className="truncate" title={teacher.email}>
            {teacher.email}
          </span>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/30 p-3 flex items-center gap-2 backdrop-blur-sm hover:bg-white/40 transition-colors">
          <LuUsers className="h-4 w-4 text-gray-600" />
          <span>{teacher.students} students</span>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/30 p-3 flex items-center gap-2 backdrop-blur-sm hover:bg-white/40 transition-colors">
          <LuStar className="h-4 w-4 text-amber-500" />
          <span>{teacher.rating}</span>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/30 p-3 backdrop-blur-sm hover:bg-white/40 transition-colors">
          <span className="text-gray-600">{teacher.experience}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="px-3 py-2 text-xs rounded-lg bg-white/20 text-indigo-900 hover:bg-white/30 border border-white/30 backdrop-blur-sm transition-colors"
            onClick={() => onViewProfile?.(teacher)}
            type="button"
          >
            View Profile
          </button>
          <button
            className="px-3 py-2 text-xs rounded-lg border border-white/30 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
            onClick={() => onMessage?.(teacher)}
            type="button"
          >
            Message
          </button>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </div>
    </div>
  );
}


