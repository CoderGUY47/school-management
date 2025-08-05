'use client'

import React from 'react';
import { HiOutlineXCircle, HiOutlineCheckCircle, HiOutlineExclamation } from 'react-icons/hi';
import { FaUserAstronaut } from "react-icons/fa";

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

interface StudentFormData {
  name: string;
  email: string;
  course: string;
  phone: string;
  grade: string;
  status: string;
}

interface TeacherFormData {
  name: string;
  email: string;
  subject: string;
  experience: string;
  students: number;
  rating: number;
}

interface EmployeeFormData {
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  status: string;
}

interface NewStudentFormData {
  name: string;
  email: string;
  course: string;
  phone: string;
  grade: string;
  status: string;
}

interface NewTeacherFormData {
  name: string;
  email: string;
  subject: string;
  experience: string;
  students: number;
  rating: number;
}

interface NewEmployeeFormData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  phone: string;
}

interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  profilePicture: string;
  nationalId: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  alternateMobile: string;
  address: string;
  city: string;
  country: string;
  emergencyContact: string;
  emergencyRelation: string;
  bloodGroup: string;
  gender: string;
  department: string;
  joiningDate: string;
  qualification: string;
  experience: string;
}

interface ModalsProps {
  // Edit modals
  showEditStudentModal: boolean;
  showEditTeacherModal: boolean;
  showEditEmployeeModal: boolean;
  editingStudent: Student | null;
  editingTeacher: Teacher | null;
  editingEmployee: Employee | null;
  studentFormData: StudentFormData;
  teacherFormData: TeacherFormData;
  employeeFormData: EmployeeFormData;
  setStudentFormData: (data: StudentFormData) => void;
  setTeacherFormData: (data: TeacherFormData) => void;
  setEmployeeFormData: (data: EmployeeFormData) => void;
  setShowEditStudentModal: (show: boolean) => void;
  setShowEditTeacherModal: (show: boolean) => void;
  setShowEditEmployeeModal: (show: boolean) => void;
  handleUpdateStudent: () => void;
  handleUpdateTeacher: () => void;
  handleUpdateEmployee: () => void;

  // Add modals
  showAddStudentModal: boolean;
  showAddTeacherModal: boolean;
  showAddEmployeeModal: boolean;
  newStudentFormData: NewStudentFormData;
  newTeacherFormData: NewTeacherFormData;
  newEmployeeFormData: NewEmployeeFormData;
  setNewStudentFormData: (data: NewStudentFormData) => void;
  setNewTeacherFormData: (data: NewTeacherFormData) => void;
  setNewEmployeeFormData: (data: NewEmployeeFormData) => void;
  setShowAddStudentModal: (show: boolean) => void;
  setShowAddTeacherModal: (show: boolean) => void;
  setShowAddEmployeeModal: (show: boolean) => void;
  handleAddStudent: () => void;
  handleAddTeacher: () => void;
  handleAddEmployee: () => void;

  // Settings modal
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
  userProfile: UserProfile;
  handleNotificationToggle: () => void;
  handleDarkModeToggle: () => void;
  handleAutoSaveToggle: () => void;
  handleBackupData: () => void;
  handleExportReports: () => void;
  handleSystemUpdates: () => void;

  // Popup modal
  showPopup: boolean;
  popupMessage: string;
  popupType: 'success' | 'error' | 'info';
  setShowPopup: (show: boolean) => void;
}

const Modals: React.FC<ModalsProps> = (props) => {
  const {
    showEditStudentModal,
    showEditTeacherModal,
    showEditEmployeeModal,
    editingStudent,
    editingTeacher,
    editingEmployee,
    studentFormData,
    teacherFormData,
    employeeFormData,
    setStudentFormData,
    setTeacherFormData,
    setEmployeeFormData,
    setShowEditStudentModal,
    setShowEditTeacherModal,
    setShowEditEmployeeModal,
    handleUpdateStudent,
    handleUpdateTeacher,
    handleUpdateEmployee,
    showAddStudentModal,
    showAddTeacherModal,
    showAddEmployeeModal,
    newStudentFormData,
    newTeacherFormData,
    newEmployeeFormData,
    setNewStudentFormData,
    setNewTeacherFormData,
    setNewEmployeeFormData,
    setShowAddStudentModal,
    setShowAddTeacherModal,
    setShowAddEmployeeModal,
    handleAddStudent,
    handleAddTeacher,
    handleAddEmployee,
    showSettings,
    setShowSettings,
    notifications,
    darkMode,
    autoSave,
    userProfile,
    handleNotificationToggle,
    handleDarkModeToggle,
    handleAutoSaveToggle,
    handleBackupData,
    handleExportReports,
    handleSystemUpdates,
    showPopup,
    popupMessage,
    popupType,
    setShowPopup
  } = props;

  return (
    <>
      {/* Edit Student Modal */}
      {showEditStudentModal && editingStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Edit Student</h3>
              <button 
                onClick={() => setShowEditStudentModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Name</label>
                <input 
                  type="text" 
                  value={studentFormData.name || ''}
                  onChange={(e) => setStudentFormData({...studentFormData, name: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Email</label>
                <input 
                  type="email" 
                  value={studentFormData.email || ''}
                  onChange={(e) => setStudentFormData({...studentFormData, email: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Course</label>
                <input 
                  type="text" 
                  value={studentFormData.course || ''}
                  onChange={(e) => setStudentFormData({...studentFormData, course: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Phone</label>
                <input 
                  type="text" 
                  value={studentFormData.phone || ''}
                  onChange={(e) => setStudentFormData({...studentFormData, phone: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Grade</label>
                <select 
                  value={studentFormData.grade || ''}
                  onChange={(e) => setStudentFormData({...studentFormData, grade: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Status</label>
                <select 
                  value={studentFormData.status || ''}
                  onChange={(e) => setStudentFormData({...studentFormData, status: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleUpdateStudent}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-poppins font-medium"
              >
                Update Student
              </button>
              <button 
                onClick={() => setShowEditStudentModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-poppins font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {showEditTeacherModal && editingTeacher && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Edit Teacher</h3>
              <button 
                onClick={() => setShowEditTeacherModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Name</label>
                <input 
                  type="text" 
                  value={teacherFormData.name || ''}
                  onChange={(e) => setTeacherFormData({...teacherFormData, name: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Email</label>
                <input 
                  type="email" 
                  value={teacherFormData.email || ''}
                  onChange={(e) => setTeacherFormData({...teacherFormData, email: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Subject</label>
                <input 
                  type="text" 
                  value={teacherFormData.subject || ''}
                  onChange={(e) => setTeacherFormData({...teacherFormData, subject: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Experience</label>
                <input 
                  type="text" 
                  value={teacherFormData.experience || ''}
                  onChange={(e) => setTeacherFormData({...teacherFormData, experience: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Number of Students</label>
                <input 
                  type="number" 
                  value={teacherFormData.students || ''}
                  onChange={(e) => setTeacherFormData({...teacherFormData, students: parseInt(e.target.value)})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Rating</label>
                <input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="5"
                  value={teacherFormData.rating || ''}
                  onChange={(e) => setTeacherFormData({...teacherFormData, rating: parseFloat(e.target.value)})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleUpdateTeacher}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 font-poppins font-medium"
              >
                Update Teacher
              </button>
              <button 
                onClick={() => setShowEditTeacherModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-poppins font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditEmployeeModal && editingEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Edit Employee</h3>
              <button 
                onClick={() => setShowEditEmployeeModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Name</label>
                <input 
                  type="text" 
                  value={employeeFormData.name || ''}
                  onChange={(e) => setEmployeeFormData({...employeeFormData, name: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Email</label>
                <input 
                  type="email" 
                  value={employeeFormData.email || ''}
                  onChange={(e) => setEmployeeFormData({...employeeFormData, email: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Role</label>
                <input 
                  type="text" 
                  value={employeeFormData.role || ''}
                  onChange={(e) => setEmployeeFormData({...employeeFormData, role: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Department</label>
                <select 
                  value={employeeFormData.department || ''}
                  onChange={(e) => setEmployeeFormData({...employeeFormData, department: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Student Services">Student Services</option>
                  <option value="Marketing & Communications">Marketing & Communications</option>
                  <option value="Administration">Administration</option>
                  <option value="Academic Affairs">Academic Affairs</option>
                  <option value="Facilities Management">Facilities Management</option>
                  <option value="Research & Development">Research & Development</option>
                  <option value="International Relations">International Relations</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Phone</label>
                <input 
                  type="text" 
                  value={employeeFormData.phone || ''}
                  onChange={(e) => setEmployeeFormData({...employeeFormData, phone: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Status</label>
                <select 
                  value={employeeFormData.status || ''}
                  onChange={(e) => setEmployeeFormData({...employeeFormData, status: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleUpdateEmployee}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 font-poppins font-medium"
              >
                Update Employee
              </button>
              <button 
                onClick={() => setShowEditEmployeeModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-poppins font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Add New Student</h3>
              <button 
                onClick={() => setShowAddStudentModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Name *</label>
                <input 
                  type="text" 
                  value={newStudentFormData.name}
                  onChange={(e) => setNewStudentFormData({...newStudentFormData, name: e.target.value})}
                  placeholder="Enter student name"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Email *</label>
                <input 
                  type="email" 
                  value={newStudentFormData.email}
                  onChange={(e) => setNewStudentFormData({...newStudentFormData, email: e.target.value})}
                  placeholder="Enter student email"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Course *</label>
                <input 
                  type="text" 
                  value={newStudentFormData.course}
                  onChange={(e) => setNewStudentFormData({...newStudentFormData, course: e.target.value})}
                  placeholder="Enter course name"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Phone</label>
                <input 
                  type="text" 
                  value={newStudentFormData.phone}
                  onChange={(e) => setNewStudentFormData({...newStudentFormData, phone: e.target.value})}
                  placeholder="Enter phone number"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Grade</label>
                <select 
                  value={newStudentFormData.grade}
                  onChange={(e) => setNewStudentFormData({...newStudentFormData, grade: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Status</label>
                <select 
                  value={newStudentFormData.status}
                  onChange={(e) => setNewStudentFormData({...newStudentFormData, status: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleAddStudent}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-poppins font-medium"
              >
                Add Student
              </button>
              <button 
                onClick={() => setShowAddStudentModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-poppins font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Add New Teacher</h3>
              <button 
                onClick={() => setShowAddTeacherModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Name *</label>
                <input 
                  type="text" 
                  value={newTeacherFormData.name}
                  onChange={(e) => setNewTeacherFormData({...newTeacherFormData, name: e.target.value})}
                  placeholder="Enter teacher name"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Email *</label>
                <input 
                  type="email" 
                  value={newTeacherFormData.email}
                  onChange={(e) => setNewTeacherFormData({...newTeacherFormData, email: e.target.value})}
                  placeholder="Enter teacher email"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Subject *</label>
                <input 
                  type="text" 
                  value={newTeacherFormData.subject}
                  onChange={(e) => setNewTeacherFormData({...newTeacherFormData, subject: e.target.value})}
                  placeholder="Enter subject name"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Experience</label>
                <input 
                  type="text" 
                  value={newTeacherFormData.experience}
                  onChange={(e) => setNewTeacherFormData({...newTeacherFormData, experience: e.target.value})}
                  placeholder="e.g., 5 years"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Number of Students</label>
                <input 
                  type="number" 
                  value={newTeacherFormData.students}
                  onChange={(e) => setNewTeacherFormData({...newTeacherFormData, students: parseInt(e.target.value)})}
                  placeholder="Enter number of students"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Rating</label>
                <input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="5"
                  value={newTeacherFormData.rating}
                  onChange={(e) => setNewTeacherFormData({...newTeacherFormData, rating: parseFloat(e.target.value)})}
                  placeholder="Enter rating (0-5)"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleAddTeacher}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 font-poppins font-medium"
              >
                Add Teacher
              </button>
              <button 
                onClick={() => setShowAddTeacherModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-poppins font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Add New Employee</h3>
              <button 
                onClick={() => setShowAddEmployeeModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Name *</label>
                <input 
                  type="text" 
                  value={newEmployeeFormData.name}
                  onChange={(e) => setNewEmployeeFormData({...newEmployeeFormData, name: e.target.value})}
                  placeholder="Enter employee name"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Email *</label>
                <input 
                  type="email" 
                  value={newEmployeeFormData.email}
                  onChange={(e) => setNewEmployeeFormData({...newEmployeeFormData, email: e.target.value})}
                  placeholder="Enter employee email"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Role *</label>
                <input 
                  type="text" 
                  value={newEmployeeFormData.role}
                  onChange={(e) => setNewEmployeeFormData({...newEmployeeFormData, role: e.target.value})}
                  placeholder="Enter employee role"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Department</label>
                <select 
                  value={newEmployeeFormData.department}
                  onChange={(e) => setNewEmployeeFormData({...newEmployeeFormData, department: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Student Services">Student Services</option>
                  <option value="Marketing & Communications">Marketing & Communications</option>
                  <option value="Administration">Administration</option>
                  <option value="Academic Affairs">Academic Affairs</option>
                  <option value="Facilities Management">Facilities Management</option>
                  <option value="Research & Development">Research & Development</option>
                  <option value="International Relations">International Relations</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Phone</label>
                <input 
                  type="text" 
                  value={newEmployeeFormData.phone}
                  onChange={(e) => setNewEmployeeFormData({...newEmployeeFormData, phone: e.target.value})}
                  placeholder="Enter phone number"
                  className="w-full p-3 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 font-poppins">Status</label>
                <select 
                  value={newEmployeeFormData.status}
                  onChange={(e) => setNewEmployeeFormData({...newEmployeeFormData, status: e.target.value})}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 focus:outline-none focus:border-blue-400 font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleAddEmployee}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 font-poppins font-medium"
              >
                Add Employee
              </button>
              <button 
                onClick={() => setShowAddEmployeeModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-poppins font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Settings */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 font-poppins">User Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300 font-poppins">Notifications</span>
                    <button 
                      onClick={handleNotificationToggle}
                      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                        notifications ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                        notifications ? 'right-1' : 'left-1'
                      }`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300 font-poppins">Dark Mode</span>
                    <button 
                      onClick={handleDarkModeToggle}
                      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                        darkMode ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                        darkMode ? 'right-1' : 'left-1'
                      }`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300 font-poppins">Auto Save</span>
                    <button 
                      onClick={handleAutoSaveToggle}
                      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                        autoSave ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                        autoSave ? 'right-1' : 'left-1'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 font-poppins">System Settings</h4>
                <div className="space-y-3">
                  <button 
                    onClick={handleBackupData}
                    className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-gray-300 font-poppins">Backup Data</span>
                  </button>
                  <button 
                    onClick={handleExportReports}
                    className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-gray-300 font-poppins">Export Reports</span>
                  </button>
                  <button 
                    onClick={handleSystemUpdates}
                    className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-gray-300 font-poppins">System Updates</span>
                  </button>
                </div>
              </div>

              {/* User Profile */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 font-poppins">User Profile</h4>
                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-sky-400 rounded-full flex items-center justify-center">
                    <FaUserAstronaut className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-medium font-poppins">{userProfile.fullName}</p>
                    <p className="text-gray-400 text-sm font-poppins">{userProfile.email}</p>
                    <p className="text-gray-500 text-xs font-poppins">{userProfile.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Popup Message */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border ${
            popupType === 'success' ? 'bg-green-500/10 border-green-500/30' :
            popupType === 'error' ? 'bg-red-500/10 border-red-500/30' :
            'bg-blue-500/10 border-blue-500/30'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                popupType === 'success' ? 'bg-green-500/20' :
                popupType === 'error' ? 'bg-red-500/20' :
                'bg-blue-500/20'
              }`}>
                {popupType === 'success' ? (
                  <HiOutlineCheckCircle className="text-green-400 text-2xl" />
                ) : popupType === 'error' ? (
                  <HiOutlineXCircle className="text-red-400 text-2xl" />
                ) : (
                  <HiOutlineExclamation className="text-blue-400 text-2xl" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold font-poppins ${
                  popupType === 'success' ? 'text-green-400' :
                  popupType === 'error' ? 'text-red-400' :
                  'text-blue-400'
                }`}>
                  {popupType === 'success' ? 'Success!' : 
                   popupType === 'error' ? 'Error!' : 'Info!'}
                </h3>
                <p className="text-white text-sm font-poppins mt-1">{popupMessage}</p>
              </div>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXCircle size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals; 