'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  HiOutlineBookOpen,
  HiOutlineStar
} from 'react-icons/hi';
import { 
  MdSchool
} from 'react-icons/md';
import { FaUser, FaUserAstronaut } from "react-icons/fa";
import { RiSettings2Fill } from "react-icons/ri";
import { BiSolidNotification } from "react-icons/bi";
import { TbArrowBigUpLineFilled } from "react-icons/tb";

// Import components
import StatsCards from './components/StatsCards';
import DataTables from './components/DataTables';
import Modals from './components/Modals';

// TypeScript interfaces
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
  name: string;
  email: string;
  role: string;
}

interface Course {
  id: number;
  name: string;
  degree: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  category: string;
}

export default function Dashboard() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // State for search functionality
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  
  // State for settings modal
  const [showSettings, setShowSettings] = useState(false);
  
  // State for edit mode
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // State for form data
  const [studentFormData, setStudentFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    course: '',
    phone: '',
    grade: '',
    status: ''
  });
  const [teacherFormData, setTeacherFormData] = useState<TeacherFormData>({
    name: '',
    email: '',
    subject: '',
    experience: '',
    students: 0,
    rating: 0
  });
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    status: ''
  });
  const [newEmployeeFormData, setNewEmployeeFormData] = useState<NewEmployeeFormData>({
    name: '',
    email: '',
    role: '',
    department: 'Information Technology',
    status: 'Active',
    phone: ''
  });
  const [newStudentFormData, setNewStudentFormData] = useState<NewStudentFormData>({
    name: '',
    email: '',
    course: '',
    phone: '',
    grade: 'A',
    status: 'Active'
  });
  const [newTeacherFormData, setNewTeacherFormData] = useState<NewTeacherFormData>({
    name: '',
    email: '',
    subject: '',
    experience: '',
    students: 0,
    rating: 4.5
  });

  // State for custom popup messages
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | 'info'>('success');

  // State for settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [userProfile] = useState<UserProfile>({
    name: 'Admin User',
    email: 'admin@blendlearning.com',
    role: 'Administrator'
  });

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // State for edit modals
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  const [currentTeacherPage, setCurrentTeacherPage] = useState(1);
  const [currentCoursePage, setCurrentCoursePage] = useState(1);

  // Edit functions
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setStudentFormData(student);
    setShowEditStudentModal(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherFormData(teacher);
    setShowEditTeacherModal(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setEmployeeFormData(employee);
    setShowEditEmployeeModal(true);
  };

  // Delete functions
  const handleDeleteStudent = (studentId: number) => {
    // Remove from the array
    const updatedStudents = studentsData.filter(student => student.id !== studentId);
    setStudentsData(updatedStudents);
    showCustomPopup(`Student with ID ${studentId} has been deleted successfully!`, 'success');
    console.log('Student deleted:', studentId);
  };

  const handleDeleteTeacher = (teacherId: number) => {
    // Remove from the array
    const updatedTeachers = teachersData.filter(teacher => teacher.id !== teacherId);
    setTeachersData(updatedTeachers);
    showCustomPopup(`Teacher with ID ${teacherId} has been deleted successfully!`, 'success');
    console.log('Teacher deleted:', teacherId);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    // Remove from the array
    const updatedEmployees = employeesData.filter(employee => employee.id !== employeeId);
    setEmployeesData(updatedEmployees);
    showCustomPopup(`Employee with ID ${employeeId} has been deleted successfully!`, 'success');
    console.log('Employee deleted:', employeeId);
  };

  const recentStudents: Student[] = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', course: 'Computer Science', status: 'Active', grade: 'A', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8901' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', course: 'Mathematics', status: 'Active', grade: 'B+', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8902' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@email.com', course: 'Physics', status: 'Inactive', grade: 'A-', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8903' },
    { id: 4, name: 'David Wilson', email: 'david.w@email.com', course: 'Chemistry', status: 'Active', grade: 'B', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8904' },
    { id: 5, name: 'Lisa Brown', email: 'lisa.b@email.com', course: 'Biology', status: 'Active', grade: 'A+', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8905' }
  ];

  const recentTeachers: Teacher[] = [
    { id: 1, name: 'Dr. Robert Smith', email: 'r.smith@email.com', subject: 'Mathematics', students: 45, rating: 4.8, avatar: '/api/placeholder/32/32', experience: '8 years' },
    { id: 2, name: 'Prof. Maria Garcia', email: 'm.garcia@email.com', subject: 'Physics', students: 38, rating: 4.9, avatar: '/api/placeholder/32/32', experience: '12 years' },
    { id: 3, name: 'Dr. James Wilson', email: 'j.wilson@email.com', subject: 'Chemistry', students: 42, rating: 4.7, avatar: '/api/placeholder/32/32', experience: '6 years' },
    { id: 4, name: 'Prof. Anna Lee', email: 'a.lee@email.com', subject: 'Biology', students: 35, rating: 4.6, avatar: '/api/placeholder/32/32', experience: '10 years' }
  ];

  const recentEmployees: Employee[] = [
    { id: 1, name: 'John Admin', email: 'j.admin@email.com', role: 'Administrator', department: 'Information Technology', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8906' },
    { id: 2, name: 'Mary HR', email: 'm.hr@email.com', role: 'HR Manager', department: 'Human Resources', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8907' },
    { id: 3, name: 'Tom Finance', email: 't.finance@email.com', role: 'Accountant', department: 'Finance & Accounting', status: 'Inactive', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8908' },
    { id: 4, name: 'Sue Support', email: 's.support@email.com', role: 'Support Staff', department: 'Student Services', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8909' },
    { id: 5, name: 'Bob Marketing', email: 'b.marketing@email.com', role: 'Marketing Specialist', department: 'Marketing & Communications', status: 'Inactive', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8910' },
    { id: 6, name: 'Alice Academic', email: 'a.academic@email.com', role: 'Academic Coordinator', department: 'Academic Affairs', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8911' },
    { id: 7, name: 'David Facilities', email: 'd.facilities@email.com', role: 'Facilities Manager', department: 'Facilities Management', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8912' },
    { id: 8, name: 'Emma Research', email: 'e.research@email.com', role: 'Research Analyst', department: 'Research & Development', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8913' },
    { id: 9, name: 'Frank International', email: 'f.international@email.com', role: 'International Relations Officer', department: 'International Relations', status: 'Inactive', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8914' },
    { id: 10, name: 'Grace IT', email: 'g.it@email.com', role: 'IT Support Specialist', department: 'Information Technology', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8915' },
    { id: 11, name: 'Henry Admin', email: 'h.admin@email.com', role: 'Administrative Assistant', department: 'Administration', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8916' },
    { id: 12, name: 'Ivy Finance', email: 'i.finance@email.com', role: 'Financial Analyst', department: 'Finance & Accounting', status: 'Active', avatar: '/api/placeholder/32/32', phone: '+1 234-567-8917' }
  ];

  // State for data arrays (to enable updates)
  const [studentsData, setStudentsData] = useState<Student[]>(recentStudents);
  const [teachersData, setTeachersData] = useState<Teacher[]>(recentTeachers);
  const [employeesData, setEmployeesData] = useState<Employee[]>(recentEmployees);

  // Update functions
  const handleUpdateStudent = () => {
    const updatedStudents = studentsData.map(student => 
      student.id === editingStudent?.id ? { ...student, ...studentFormData } : student
    );
    setStudentsData(updatedStudents);
    setShowEditStudentModal(false);
    showCustomPopup('Student updated successfully!', 'success');
    console.log('Student updated successfully!');
  };

  const handleUpdateTeacher = () => {
    const updatedTeachers = teachersData.map(teacher => 
      teacher.id === editingTeacher?.id ? { ...teacher, ...teacherFormData } : teacher
    );
    setTeachersData(updatedTeachers);
    setShowEditTeacherModal(false);
    showCustomPopup('Teacher updated successfully!', 'success');
    console.log('Teacher updated successfully!');
  };

  const handleUpdateEmployee = () => {
    const updatedEmployees = employeesData.map(employee => 
      employee.id === editingEmployee?.id ? { ...employee, ...employeeFormData } : employee
    );
    setEmployeesData(updatedEmployees);
    setShowEditEmployeeModal(false);
    showCustomPopup('Employee updated successfully!', 'success');
    console.log('Employee updated successfully!');
  };

  // Custom popup message function
  const showCustomPopup = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Settings functions
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    showCustomPopup(`Notifications ${!notifications ? 'enabled' : 'disabled'}!`, 'info');
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    showCustomPopup(`Dark mode ${!darkMode ? 'enabled' : 'disabled'}!`, 'info');
  };

  const handleAutoSaveToggle = () => {
    setAutoSave(!autoSave);
    showCustomPopup(`Auto save ${!autoSave ? 'enabled' : 'disabled'}!`, 'info');
  };

  const handleBackupData = () => {
    showCustomPopup('Data backup completed successfully!', 'success');
  };

  const handleExportReports = () => {
    showCustomPopup('Reports exported successfully!', 'success');
  };

  const handleSystemUpdates = () => {
    showCustomPopup('System is up to date!', 'info');
  };

  // Add new employee function
  const handleAddEmployee = () => {
    if (!newEmployeeFormData.name || !newEmployeeFormData.email || !newEmployeeFormData.role) {
      showCustomPopup('Please fill in all required fields!', 'error');
      return;
    }

    const newEmployee = {
      id: employeesData.length + 1,
      name: newEmployeeFormData.name,
      email: newEmployeeFormData.email,
      role: newEmployeeFormData.role,
      department: newEmployeeFormData.department,
      status: newEmployeeFormData.status,
      phone: newEmployeeFormData.phone,
      avatar: '/api/placeholder/32/32'
    };

    setEmployeesData([...employeesData, newEmployee]);
    setShowAddEmployeeModal(false);
    
    // Reset form
    setNewEmployeeFormData({
      name: '',
      email: '',
      role: '',
      department: 'Information Technology',
      status: 'Active',
      phone: ''
    });
    
    showCustomPopup('Employee added successfully!', 'success');
  };

  // Add new student function
  const handleAddStudent = () => {
    if (!newStudentFormData.name || !newStudentFormData.email || !newStudentFormData.course) {
      showCustomPopup('Please fill in all required fields!', 'error');
      return;
    }

    const newStudent = {
      id: studentsData.length + 1,
      name: newStudentFormData.name,
      email: newStudentFormData.email,
      course: newStudentFormData.course,
      status: newStudentFormData.status,
      grade: newStudentFormData.grade,
      phone: newStudentFormData.phone,
      avatar: '/api/placeholder/32/32'
    };

    setStudentsData([...studentsData, newStudent]);
    setShowAddStudentModal(false);
    
    // Reset form
    setNewStudentFormData({
      name: '',
      email: '',
      course: '',
      phone: '',
      grade: 'A',
      status: 'Active'
    });
    
    showCustomPopup('Student added successfully!', 'success');
  };

  // Add new teacher function
  const handleAddTeacher = () => {
    if (!newTeacherFormData.name || !newTeacherFormData.email || !newTeacherFormData.subject) {
      showCustomPopup('Please fill in all required fields!', 'error');
      return;
    }

    const newTeacher = {
      id: teachersData.length + 1,
      name: newTeacherFormData.name,
      email: newTeacherFormData.email,
      subject: newTeacherFormData.subject,
      students: newTeacherFormData.students,
      rating: newTeacherFormData.rating,
      experience: newTeacherFormData.experience,
      avatar: '/api/placeholder/32/32'
    };

    setTeachersData([...teachersData, newTeacher]);
    setShowAddTeacherModal(false);
    
    // Reset form
    setNewTeacherFormData({
      name: '',
      email: '',
      subject: '',
      experience: '',
      students: 0,
      rating: 4.5
    });
    
    showCustomPopup('Teacher added successfully!', 'success');
  };

  // Search filter functions
  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  const filteredTeachers = teachersData.filter(teacher =>
    teacher.name.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(teacherSearchTerm.toLowerCase())
  );

  const filteredEmployees = employeesData.filter(employee =>
    employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(employeeSearchTerm.toLowerCase())
  );

  // Pagination logic for employees
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Pagination functions
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [employeeSearchTerm]);

  // Pagination logic for students
  const indexOfLastStudent = currentStudentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalStudentPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // Pagination logic for teachers
  const indexOfLastTeacher = currentTeacherPage * itemsPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalTeacherPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  // Student pagination functions
  const handleStudentPageChange = (pageNumber: number) => {
    setCurrentStudentPage(pageNumber);
  };

  const handleStudentPreviousPage = () => {
    setCurrentStudentPage(prev => Math.max(prev - 1, 1));
  };

  const handleStudentNextPage = () => {
    setCurrentStudentPage(prev => Math.min(prev + 1, totalStudentPages));
  };

  // Teacher pagination functions
  const handleTeacherPageChange = (pageNumber: number) => {
    setCurrentTeacherPage(pageNumber);
  };

  const handleTeacherPreviousPage = () => {
    setCurrentTeacherPage(prev => Math.max(prev - 1, 1));
  };

  const handleTeacherNextPage = () => {
    setCurrentTeacherPage(prev => Math.min(prev + 1, totalTeacherPages));
  };

  // Reset to first page when search terms change
  useEffect(() => {
    setCurrentStudentPage(1);
  }, [studentSearchTerm]);

  useEffect(() => {
    setCurrentTeacherPage(1);
  }, [teacherSearchTerm]);

  // Trending courses data
  const trendingCourses: Course[] = [
    {
      id: 1,
      name: "Computer Science",
      degree: "BSc",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      duration: "3 Years",
      students: 245,
      rating: 4.8,
      category: "Technology"
    },
    {
      id: 2,
      name: "Data Science",
      degree: "MSc",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      duration: "2 Years",
      students: 189,
      rating: 4.9,
      category: "Technology"
    },
    {
      id: 3,
      name: "Business Administration",
      degree: "BSc",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      duration: "3 Years",
      students: 312,
      rating: 4.7,
      category: "Business"
    },
    {
      id: 4,
      name: "Artificial Intelligence",
      degree: "MSc",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      duration: "2 Years",
      students: 156,
      rating: 4.9,
      category: "Technology"
    },
    {
      id: 5,
      name: "Psychology",
      degree: "BSc",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      duration: "3 Years",
      students: 278,
      rating: 4.6,
      category: "Social Sciences"
    },
    {
      id: 6,
      name: "Cybersecurity",
      degree: "MSc",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
      duration: "2 Years",
      students: 134,
      rating: 4.8,
      category: "Technology"
    },
    {
      id: 7,
      name: "Marketing",
      degree: "BSc",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      duration: "3 Years",
      students: 267,
      rating: 4.5,
      category: "Business"
    },
    {
      id: 8,
      name: "Biotechnology",
      degree: "MSc",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      duration: "2 Years",
      students: 98,
      rating: 4.7,
      category: "Science"
    },
    {
      id: 9,
      name: "Finance",
      degree: "BSc",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      duration: "3 Years",
      students: 234,
      rating: 4.6,
      category: "Business"
    },
    {
      id: 10,
      name: "Environmental Science",
      degree: "MSc",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      duration: "2 Years",
      students: 145,
      rating: 4.8,
      category: "Science"
    }
  ];

  // Pagination logic for courses
  const coursesPerPage = 6;
  const indexOfLastCourse = currentCoursePage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = trendingCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalCoursePages = Math.ceil(trendingCourses.length / coursesPerPage);

  // Course pagination functions
  const handleCoursePageChange = (pageNumber: number) => {
    setCurrentCoursePage(pageNumber);
  };

  const handleCoursePreviousPage = () => {
    setCurrentCoursePage(prev => Math.max(prev - 1, 1));
  };

  const handleCourseNextPage = () => {
    setCurrentCoursePage(prev => Math.min(prev + 1, totalCoursePages));
  };

  return (
    <div className={`min-h-screen font-poppins transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-[#250c38] via-[#3c225a] to-slate-800'
    }`}>
      {/* Header */}
      <header className={`backdrop-blur-xl shadow-lg transition-all duration-500 ${
        darkMode ? 'bg-black/20' : 'bg-white/10'
      }`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-700 to-purple-400 rounded-full flex items-center justify-center">
                  <MdSchool className="text-white text-3xl" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white font-poppins">Blend Learning Center</div>
                  <div className="text-gray-300 text-sm font-poppins">Administrative Dashboard</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex">
              <div className="text-right flex flex-row gap-x-4">
                    <div className="text-gray-400 text-base font-poppins">Courses</div>
                    <div className="text-gray-400 text-base font-poppins">Students</div>
                    <div className="text-gray-400 text-base font-poppins">Teachers</div>
                  </div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="flex items-center space-x-4">
                <button className="relative p-3 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10">
                  <BiSolidNotification size={26} />
                  <span className="absolute -top-1 right-1 w-3 h-3 bg-orange-600 rounded-full"></span>
                </button>
                <button 
                  onClick={handleSettingsClick}
                  className="p-3 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <RiSettings2Fill size={26} />
                </button>
                <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-400 rounded-full flex items-center justify-center text-white font-semibold shadow-lg font-poppins">
                  <FaUser className="text-white text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <StatsCards darkMode={darkMode} />

        {/* Trending Courses */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <HiOutlineBookOpen className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-white font-poppins">Trending Courses</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium hover:bg-indigo-500/10 px-4 py-2 rounded-lg transition-colors font-poppins">
                View All Courses
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <div key={course.id} className={`backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-500 ${
                darkMode ? 'bg-black/20' : 'bg-white/10'
              }`}>
                <div className="relative">
                  <Image 
                    src={course.image} 
                    alt={course.name}
                    width={400}
                    height={300}
                    className="w-full h-[250px] object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium font-poppins ${
                      course.degree === 'BSc' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {course.degree}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-500/30">
                      <HiOutlineStar className="text-yellow-400" size={12} />
                      <span className="text-yellow-400 font-semibold text-xs font-poppins">{course.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-2 font-poppins line-clamp-2">{course.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400 font-poppins">
                      <span>Duration</span>
                      <span className="text-white">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 font-poppins">
                      <span>Students</span>
                      <span className="text-white">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 font-poppins">
                      <span>Category</span>
                      <span className="text-white">{course.category}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-2 px-3 rounded-xl 
                    hover:from-purple-600 hover:to-indigo-600 transition-all duration-500 font-poppins font-medium text-sm">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Component for Courses */}
          {trendingCourses.length > coursesPerPage && (
            <div className="flex items-center justify-between mt-4 px-4">
              <div className="text-sm text-gray-300 font-poppins">
                Showing {indexOfFirstCourse + 1} to {Math.min(indexOfLastCourse, trendingCourses.length)} of {trendingCourses.length} courses
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCoursePreviousPage}
                  disabled={currentCoursePage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentCoursePage === 1
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalCoursePages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentCoursePage;
                    const isNearCurrent = Math.abs(pageNumber - currentCoursePage) <= 1;
                    const isFirstOrLast = pageNumber === 1 || pageNumber === totalCoursePages;
                    
                    if (isCurrentPage || isNearCurrent || isFirstOrLast) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handleCoursePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isCurrentPage
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (pageNumber === currentCoursePage - 2 || pageNumber === currentCoursePage + 2) {
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
                  onClick={handleCourseNextPage}
                  disabled={currentCoursePage === totalCoursePages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentCoursePage === totalCoursePages
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

        {/* Data Tables Section */}
        <DataTables 
          darkMode={darkMode}
          studentSearchTerm={studentSearchTerm}
          teacherSearchTerm={teacherSearchTerm}
          employeeSearchTerm={employeeSearchTerm}
          setStudentSearchTerm={setStudentSearchTerm}
          setTeacherSearchTerm={setTeacherSearchTerm}
          setEmployeeSearchTerm={setEmployeeSearchTerm}
          setShowAddStudentModal={setShowAddStudentModal}
          setShowAddTeacherModal={setShowAddTeacherModal}
          setShowAddEmployeeModal={setShowAddEmployeeModal}
          handleEditStudent={handleEditStudent}
          handleEditTeacher={handleEditTeacher}
          handleEditEmployee={handleEditEmployee}
          handleDeleteStudent={handleDeleteStudent}
          handleDeleteTeacher={handleDeleteTeacher}
          handleDeleteEmployee={handleDeleteEmployee}
          currentStudents={currentStudents}
          currentTeachers={currentTeachers}
          currentEmployees={currentEmployees}
          filteredStudents={filteredStudents}
          filteredTeachers={filteredTeachers}
          filteredEmployees={filteredEmployees}
          currentStudentPage={currentStudentPage}
          currentTeacherPage={currentTeacherPage}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalStudentPages={totalStudentPages}
          totalTeacherPages={totalTeacherPages}
          totalPages={totalPages}
          handleStudentPageChange={handleStudentPageChange}
          handleTeacherPageChange={handleTeacherPageChange}
          handlePageChange={handlePageChange}
          handleStudentPreviousPage={handleStudentPreviousPage}
          handleTeacherPreviousPage={handleTeacherPreviousPage}
          handlePreviousPage={handlePreviousPage}
          handleStudentNextPage={handleStudentNextPage}
          handleTeacherNextPage={handleTeacherNextPage}
          handleNextPage={handleNextPage}
          indexOfFirstStudent={indexOfFirstStudent}
          indexOfLastStudent={indexOfLastStudent}
          indexOfFirstTeacher={indexOfFirstTeacher}
          indexOfLastTeacher={indexOfLastTeacher}
          indexOfFirstEmployee={indexOfFirstEmployee}
          indexOfLastEmployee={indexOfLastEmployee}
        />
      </main>

      {/* All Modals */}
      <Modals 
        showEditStudentModal={showEditStudentModal}
        showEditTeacherModal={showEditTeacherModal}
        showEditEmployeeModal={showEditEmployeeModal}
        editingStudent={editingStudent}
        editingTeacher={editingTeacher}
        editingEmployee={editingEmployee}
        studentFormData={studentFormData}
        teacherFormData={teacherFormData}
        employeeFormData={employeeFormData}
        setStudentFormData={setStudentFormData}
        setTeacherFormData={setTeacherFormData}
        setEmployeeFormData={setEmployeeFormData}
        setShowEditStudentModal={setShowEditStudentModal}
        setShowEditTeacherModal={setShowEditTeacherModal}
        setShowEditEmployeeModal={setShowEditEmployeeModal}
        handleUpdateStudent={handleUpdateStudent}
        handleUpdateTeacher={handleUpdateTeacher}
        handleUpdateEmployee={handleUpdateEmployee}
        showAddStudentModal={showAddStudentModal}
        showAddTeacherModal={showAddTeacherModal}
        showAddEmployeeModal={showAddEmployeeModal}
        newStudentFormData={newStudentFormData}
        newTeacherFormData={newTeacherFormData}
        newEmployeeFormData={newEmployeeFormData}
        setNewStudentFormData={setNewStudentFormData}
        setNewTeacherFormData={setNewTeacherFormData}
        setNewEmployeeFormData={setNewEmployeeFormData}
        setShowAddStudentModal={setShowAddStudentModal}
        setShowAddTeacherModal={setShowAddTeacherModal}
        setShowAddEmployeeModal={setShowAddEmployeeModal}
        handleAddStudent={handleAddStudent}
        handleAddTeacher={handleAddTeacher}
        handleAddEmployee={handleAddEmployee}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        notifications={notifications}
        darkMode={darkMode}
        autoSave={autoSave}
        userProfile={userProfile}
        handleNotificationToggle={handleNotificationToggle}
        handleDarkModeToggle={handleDarkModeToggle}
        handleAutoSaveToggle={handleAutoSaveToggle}
        handleBackupData={handleBackupData}
        handleExportReports={handleExportReports}
        handleSystemUpdates={handleSystemUpdates}
        showPopup={showPopup}
        popupMessage={popupMessage}
        popupType={popupType}
        setShowPopup={setShowPopup}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={scrollToTop}
            className="p-5 bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-400 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-2xl transition-all duration-300 animate-bounce"
          >
            <TbArrowBigUpLineFilled className="text-3xl font-bold" />
          </button>
        </div>
      )}
    </div>
  );
} 