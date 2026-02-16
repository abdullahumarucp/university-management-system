import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students && students.length > 0) {
      const filtered = students.filter(student => {
        const fullName = `${student.firstName || ''} ${student.lastName || ''}`.toLowerCase();
        return fullName.includes(searchName.toLowerCase());
      });
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [students, searchName]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

const addStudent = async (student) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(API_BASE_URL, student, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents([...students, response.data]);
      setShowForm(false);
      setEditingStudent(null);
      setError('');
    } catch (error) {
      console.error('Error adding student:', error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || 'Student ID or email already exists');
      } else {
        setError('Failed to add student. Please try again.');
      }
    }
  };

  const updateStudent = async (student) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(`${API_BASE_URL}/${editingStudent._id}`, student, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(students.map(s => s._id === editingStudent._id ? response.data : s));
      setEditingStudent(null);
      setShowForm(false);
      // Scroll to dashboard
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(students.filter(s => s._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
    // Scroll to form with a slight delay to ensure it renders
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFormCancel = () => {
    setEditingStudent(null);
    setShowForm(false);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>🎓 Student Management Portal</h1>
        <p>Manage student information efficiently</p>
      </div>
      
      <div className="controls">
        <button className="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add New Student'}
        </button>
        <input
          type="text"
          placeholder="🔍 Search students by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={() => setFilteredStudents(students)}>Refresh</button>
      </div>

      {showForm && <StudentForm ref={formRef} onSubmit={editingStudent ? updateStudent : addStudent} student={editingStudent} onCancel={handleFormCancel} />}
      
      <div className="content-wrapper">
        <StudentList students={filteredStudents.length > 0 ? filteredStudents : students} onEdit={editStudent} onDelete={deleteStudent} />
      </div>
    </div>
  );
}

export default App;
