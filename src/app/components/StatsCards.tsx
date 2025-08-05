'use client'

import React from 'react';
import { LiaUsersSolid } from "react-icons/lia";
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineBookOpen, HiTrendingUp } from 'react-icons/hi';

interface StatsCardProps {
  darkMode: boolean;
}

const StatsCards: React.FC<StatsCardProps> = ({ darkMode }) => {
  const stats = [
    { title: 'Total Students', count: 1247, icon: LiaUsersSolid, change: '+12%', trend: 'up' },
    { title: 'Total Teachers', count: 89, icon: HiOutlineAcademicCap, change: '+5%', trend: 'up' },
    { title: 'Total Employees', count: 156, icon: HiOutlineBriefcase, change: '+8%', trend: 'up' },
    { title: 'Active Courses', count: 45, icon: HiOutlineBookOpen, change: '+15%', trend: 'up' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`backdrop-blur-2xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 ${
          darkMode ? 'bg-black/20' : 'bg-white/10'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium font-poppins">{stat.title}</p>
              <p className="text-3xl font-bold text-white mt-2 font-poppins">{stat.count.toString()}</p>
              <div className="flex items-center space-x-1 mt-1">
                <HiTrendingUp className="text-green-400" size={36} />
                <p className="text-green-400 text-sm font-poppins">{stat.change} from last month</p>
              </div>
            </div>
            <div className={`w-16 h-16 flex items-center bg-white/10 rounded-full justify-center`}>
              <stat.icon className="text-white text-3xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards; 