# School Management System - Code Examples for Slides

## **Slide 1: Project Overview - No Code Needed**
- Show project screenshots
- List technology stack
- Display key features

---

## **Slide 2: Technology Architecture - Simple Code Examples**

### Frontend Framework Setup
```javascript
// Next.js App Structure
import React from 'react';
import { useState, useEffect } from 'react';

// Simple Component
function Dashboard() {
  return (
    <div className="dashboard">
      <h1>School Management System</h1>
      <p>Welcome to the dashboard</p>
    </div>
  );
}
```

### Backend Server Setup
```javascript
// Express.js Server
const express = require('express');
const app = express();

app.get('/api/students', (req, res) => {
  res.json({ message: 'Students data' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## **Slide 3: Core Components - Component Code**

### Simple Profile Component
```javascript
// ProfileSettings.tsx - Simple Version
function ProfileSettings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="profile-form">
      <input 
        type="text" 
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="email" 
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>Save Profile</button>
    </div>
  );
}
```

### Simple Data Table
```javascript
// DataTables.tsx - Simple Version
function DataTable() {
  const students = [
    { id: 1, name: 'John Doe', grade: 'A' },
    { id: 2, name: 'Jane Smith', grade: 'B' }
  ];

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## **Slide 4: Development Methodology - Agile Code Example**

### Sprint Planning Structure
```javascript
// Sprint Planning Example
const sprintPlan = {
  sprint1: {
    goal: 'Core Infrastructure',
    tasks: ['Setup project', 'Basic layout', 'Routing']
  },
  sprint2: {
    goal: 'User Authentication',
    tasks: ['Login form', 'User validation', 'Session management']
  },
  sprint3: {
    goal: 'Data Management',
    tasks: ['Student CRUD', 'Teacher CRUD', 'Tables']
  }
};

// Sprint Execution
function executeSprint(sprintNumber) {
  const sprint = sprintPlan[`sprint${sprintNumber}`];
  console.log(`Starting ${sprint.goal}`);
  sprint.tasks.forEach(task => {
    console.log(`- ${task}`);
  });
}
```

---

## **Slide 5: Technical Implementation - Code Quality**

### TypeScript Interface Example
```typescript
// Type Safety with Interfaces
interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
}

// Using the interface
function addStudent(student: Student) {
  console.log(`Adding student: ${student.name}`);
  // Database operation here
}

// This will show error if wrong data type
addStudent({
  id: 1,
  name: 'John',
  email: 'john@school.com',
  grade: 'A'
});
```

### Error Handling Example
```javascript
// Error Boundary Pattern
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    return (
      <div className="error-message">
        <h2>Something went wrong!</h2>
        <p>Please try again later.</p>
      </div>
    );
  }
}
```

---

## **Slide 6: User Experience - State Management**

### Simple State Management
```javascript
// User Interface State
function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <input 
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <label>
        <input 
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        Enable Notifications
      </label>
    </div>
  );
}
```

---

## **Slide 7: Future Roadmap - Code Structure**

### Database Integration Example
```javascript
// Future: Database Connection
const mongoose = require('mongoose');

// Student Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  grade: String,
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// API Endpoint
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ success: true, student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Real-time Notifications
```javascript
// Future: WebSocket Implementation
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('join-room', (room) => {
    socket.join(room);
  });
  
  socket.on('send-notification', (data) => {
    io.to(data.room).emit('new-notification', data.message);
  });
});
```

---

## **How to Use These Code Examples in PowerPoint:**

1. **Copy the code** from each slide
2. **Paste into PowerPoint** text boxes
3. **Use monospace font** like Consolas or Courier New
4. **Adjust font size** to fit on slides (usually 12-14pt)
5. **Add syntax highlighting** with different colors
6. **Keep code short** - focus on key concepts

## **Code Formatting Tips:**

- **Use consistent indentation**
- **Highlight important parts** with comments
- **Keep examples under 10 lines** per slide
- **Add line numbers** if needed
- **Use different colors** for different code elements

These code examples are simple enough for PowerPoint slides while still demonstrating the technical capabilities of your School Management System!
