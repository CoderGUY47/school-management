'use client'

import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { GrUserWorker } from "react-icons/gr";
import { HiOutlineSearch, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineMail, HiOutlinePhone, HiOutlineStar, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  status: string;
  grade: string;
  phone: string;
  avatar: string;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  students: number;
  rating: number;
  experience: string;
  avatar: string;
}

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  phone: string;
  avatar: string;
}

interface DataTablesProps {
  darkMode: boolean;
  studentSearchTerm: string;
  teacherSearchTerm: string;
  employeeSearchTerm: string;
  setStudentSearchTerm: (term: string) => void;
  setTeacherSearchTerm: (term: string) => void;
  setEmployeeSearchTerm: (term: string) => void;
  setShowAddStudentModal: (show: boolean) => void;
  setShowAddTeacherModal: (show: boolean) => void;
  setShowAddEmployeeModal: (show: boolean) => void;
  handleEditStudent: (student: Student) => void;
  handleEditTeacher: (teacher: Teacher) => void;
  handleEditEmployee: (employee: Employee) => void;
  handleDeleteStudent: (id: number) => void;
  handleDeleteTeacher: (id: number) => void;
  handleDeleteEmployee: (id: number) => void;
  currentStudents: Student[];
  currentTeachers: Teacher[];
  currentEmployees: Employee[];
  filteredStudents: Student[];
  filteredTeachers: Teacher[];
  filteredEmployees: Employee[];
  currentStudentPage: number;
  currentTeacherPage: number;
  currentPage: number;
  itemsPerPage: number;
  totalStudentPages: number;
  totalTeacherPages: number;
  totalPages: number;
  handleStudentPageChange: (page: number) => void;
  handleTeacherPageChange: (page: number) => void;
  handlePageChange: (page: number) => void;
  handleStudentPreviousPage: () => void;
  handleTeacherPreviousPage: () => void;
  handlePreviousPage: () => void;
  handleStudentNextPage: () => void;
  handleTeacherNextPage: () => void;
  handleNextPage: () => void;
  indexOfFirstStudent: number;
  indexOfLastStudent: number;
  indexOfFirstTeacher: number;
  indexOfLastTeacher: number;
  indexOfFirstEmployee: number;
  indexOfLastEmployee: number;
}

const DataTables: React.FC<DataTablesProps> = ({
  darkMode,
  studentSearchTerm,
  teacherSearchTerm,
  employeeSearchTerm,
  setStudentSearchTerm,
  setTeacherSearchTerm,
  setEmployeeSearchTerm,
  setShowAddStudentModal,
  setShowAddTeacherModal,
  setShowAddEmployeeModal,
  handleEditStudent,
  handleEditTeacher,
  handleEditEmployee,
  handleDeleteStudent,
  handleDeleteTeacher,
  handleDeleteEmployee,
  currentStudents,
  currentTeachers,
  currentEmployees,
  filteredStudents,
  filteredTeachers,
  filteredEmployees,
  currentStudentPage,
  currentTeacherPage,
  currentPage,
  itemsPerPage,
  totalStudentPages,
  totalTeacherPages,
  totalPages,
  handleStudentPageChange,
  handleTeacherPageChange,
  handlePageChange,
  handleStudentPreviousPage,
  handleTeacherPreviousPage,
  handlePreviousPage,
  handleStudentNextPage,
  handleTeacherNextPage,
  handleNextPage,
  indexOfFirstStudent,
  indexOfLastStudent,
  indexOfFirstTeacher,
  indexOfLastTeacher,
  indexOfFirstEmployee,
  indexOfLastEmployee
}) => {
  return (
    <div className="grid grid-cols-1 gap-y-6">
      {/* Recent Students */}
      <div className={`backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-500 ${
        darkMode ? 'bg-black/20' : 'bg-white/10'
      }`}>
        <div className="p-6 border-b-4 border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaUserGraduate className="text-blue-400 text-xl" />
              <h3 className="text-xl font-semibold text-white font-poppins">Recent Students</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <button 
                onClick={() => setShowAddStudentModal(true)}
                className="bg-gradient-to-br from-blue-600 to-sky-500 text-white px-4 py-2 rounded-lg hover:from-sky-500 hover:to-blue-600 transition-all duration-500 font-poppins font-semibold flex items-center space-x-2"
              >
                <HiOutlinePlus size={20} />
                <span>Add Student</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Name</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Contact Info</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Course</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Grade</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Status</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-xl flex items-center justify-center text-white font-semibold text-md shadow-lg">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium font-poppins">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-300 font-poppins">
                          <HiOutlineMail size={14} />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-300 font-poppins">
                          <HiOutlinePhone size={14} />
                          <span>{student.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300 font-poppins">{student.course}</td>
                    <td className="py-4 px-4">
                      <span className="text-white font-semibold bg-white/10 px-3 py-1 rounded-lg font-poppins">{student.grade}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${
                        student.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {student.status === 'Active' ? (
                          <HiOutlineCheckCircle className="inline mr-1" size={12} />
                        ) : (
                          <HiOutlineXCircle className="inline mr-1" size={12} />
                        )}
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditStudent(student)}
                          className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 rounded-lg"
                          title="Edit Student"
                        >
                          <HiOutlinePencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 rounded-lg"
                          title="Delete Student"
                        >
                          <HiOutlineTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Component for Students */}
            {filteredStudents.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6 px-4">
                <div className="text-sm text-gray-300 font-poppins">
                  Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleStudentPreviousPage}
                    disabled={currentStudentPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentStudentPage === 1
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalStudentPages }, (_, index) => {
                      const pageNumber = index + 1;
                      const isCurrentPage = pageNumber === currentStudentPage;
                      const isNearCurrent = Math.abs(pageNumber - currentStudentPage) <= 1;
                      const isFirstOrLast = pageNumber === 1 || pageNumber === totalStudentPages;
                      
                      if (isCurrentPage || isNearCurrent || isFirstOrLast) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handleStudentPageChange(pageNumber)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isCurrentPage
                                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (pageNumber === currentStudentPage - 2 || pageNumber === currentStudentPage + 2) {
                        return (
                          <span key={pageNumber} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={handleStudentNextPage}
                    disabled={currentStudentPage === totalStudentPages}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentStudentPage === totalStudentPages
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Teachers */}
      <div className={`backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-500 ${
        darkMode ? 'bg-black/20' : 'bg-white/10'
      }`}>
        <div className="p-6 border-b-4 border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="text-purple-400 text-xl" />
              <h3 className="text-xl font-semibold text-white font-poppins">Recent Teachers</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={teacherSearchTerm}
                  onChange={(e) => setTeacherSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 font-poppins"
                />
              </div>
              <button 
                onClick={() => setShowAddTeacherModal(true)}
                className="bg-gradient-to-br from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-500 font-poppins font-semibold flex items-center space-x-2"
              >
                <HiOutlinePlus size={20} />
                <span>Add Teacher</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Name</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Contact Info</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Subject</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Experience</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Students</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Rating</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold text-md shadow-lg">
                          {teacher.name.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium font-poppins">{teacher.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-300 font-poppins">
                        <HiOutlineMail size={14} />
                        <span>{teacher.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300 font-poppins">{teacher.subject}</td>
                    <td className="py-4 px-4 text-sm text-gray-300 font-poppins">{teacher.experience}</td>
                    <td className="py-4 px-4">
                      <span className="text-white font-semibold bg-white/10 px-3 py-1 rounded-lg font-poppins">{teacher.students}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-500/30">
                        <HiOutlineStar className="text-yellow-400" size={14} />
                        <span className="text-yellow-400 font-semibold text-sm font-poppins">{teacher.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditTeacher(teacher)}
                          className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 rounded-lg"
                          title="Edit Teacher"
                        >
                          <HiOutlinePencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 rounded-lg"
                          title="Delete Teacher"
                        >
                          <HiOutlineTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Component for Teachers */}
            {filteredTeachers.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6 px-4">
                <div className="text-sm text-gray-300 font-poppins">
                  Showing {indexOfFirstTeacher + 1} to {Math.min(indexOfLastTeacher, filteredTeachers.length)} of {filteredTeachers.length} teachers
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleTeacherPreviousPage}
                    disabled={currentTeacherPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentTeacherPage === 1
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalTeacherPages }, (_, index) => {
                      const pageNumber = index + 1;
                      const isCurrentPage = pageNumber === currentTeacherPage;
                      const isNearCurrent = Math.abs(pageNumber - currentTeacherPage) <= 1;
                      const isFirstOrLast = pageNumber === 1 || pageNumber === totalTeacherPages;
                      
                      if (isCurrentPage || isNearCurrent || isFirstOrLast) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handleTeacherPageChange(pageNumber)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isCurrentPage
                                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (pageNumber === currentTeacherPage - 2 || pageNumber === currentTeacherPage + 2) {
                        return (
                          <span key={pageNumber} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={handleTeacherNextPage}
                    disabled={currentTeacherPage === totalTeacherPages}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentTeacherPage === totalTeacherPages
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className={`mt-8 backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-500 ${
        darkMode ? 'bg-black/20' : 'bg-white/10'
      }`}>
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GrUserWorker className="text-orange-400 text-3xl" />
              <h3 className="text-xl font-semibold text-white font-poppins">All Employees</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search employees..." 
                  value={employeeSearchTerm}
                  onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-transparent focus:outline-none font-poppins"
                />
              </div>
              <button 
                onClick={() => setShowAddEmployeeModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-br from-orange-600 to-orange-400 hover:to-orange-600 hover:from-orange-400 text-white py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-poppins font-medium"
              >
                <HiOutlinePlus size={18} />
                <span>Add Employee</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Name</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Contact Info</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Role</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Department</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Status</th>
                  <th className="text-left text-xl pt-2 pb-7 px-4 text-gray-300 font-medium font-poppins">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-400 rounded-xl flex items-center justify-center text-white font-semibold text-md shadow-lg">
                          <GrUserWorker className="text-white text-lg" />
                        </div>
                        <span className="text-white text-sm font-medium font-poppins">{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-300 font-poppins">
                          <HiOutlineMail size={14} />
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-300 font-poppins">
                          <HiOutlinePhone size={14} />
                          <span>{employee.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300 font-poppins">{employee.role}</td>
                    <td className="py-4 px-4 text-sm text-gray-300 font-poppins">{employee.department}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium font-poppins ${
                        employee.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {employee.status === 'Active' ? (
                          <HiOutlineCheckCircle className="inline mr-1" size={12} />
                        ) : (
                          <HiOutlineXCircle className="inline mr-1" size={12} />
                        )}
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditEmployee(employee)}
                          className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 rounded-lg"
                          title="Edit Employee"
                        >
                          <HiOutlinePencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 rounded-lg"
                          title="Delete Employee"
                        >
                          <HiOutlineTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Component */}
            {filteredEmployees.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6 px-4">
                <div className="text-sm text-gray-300 font-poppins">
                  Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} employees
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      const isCurrentPage = pageNumber === currentPage;
                      const isNearCurrent = Math.abs(pageNumber - currentPage) <= 1;
                      const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;
                      
                      if (isCurrentPage || isNearCurrent || isFirstOrLast) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              isCurrentPage
                                ? 'bg-gradient-to-tr from-orange-600 to-orange-400 text-white'
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                        return (
                          <span key={pageNumber} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTables; 