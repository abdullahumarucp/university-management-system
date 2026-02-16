import React, { useState, useEffect, forwardRef } from 'react';

const StudentForm = forwardRef(({ onSubmit, student, onCancel }, ref) => {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (student) {
      setStudentId(student.studentId || '');
      setFirstName(student.firstName || '');
      setLastName(student.lastName || '');
      setEmail(student.email || '');
      setPhone(student.phone || '');
      setCourse(student.course || '');
      setYear(student.year || '');
      setAddress(student.address || '');
      setDateOfBirth(student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '');
      setGender(student.gender || '');
    } else {
      setStudentId('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCourse('');
      setYear('');
      setAddress('');
      setDateOfBirth('');
      setGender('');
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      studentId,
      firstName,
      lastName,
      email,
      phone,
      course,
      year: parseInt(year),
      address,
      dateOfBirth,
      gender
    });
    // Reset form after submission
    setStudentId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCourse('');
    setYear('');
    setAddress('');
    setDateOfBirth('');
    setGender('');
  };

  const handleCancel = () => {
    // Reset form
    setStudentId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCourse('');
    setYear('');
    setAddress('');
    setDateOfBirth('');
    setGender('');
    // Call parent's onCancel callback if provided
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit}>
      <h2>{student ? '✎ Edit Student Information' : '➕ Add New Student'}</h2>
      
      <div>
        <label>Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="e.g., STU001"
          required
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            required
          />
        </div>
        
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@university.edu"
          required
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label>Course:</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Computer Science"
            required
          />
        </div>
        
        <div>
          <label>Year of Study:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1"
            max="6"
            placeholder="1"
            required
          />
        </div>
      </div>
      
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, Country"
        />
      </div>
      
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
        <button type="submit">{student ? '💾 Update Student' : '➕ Add Student'}</button>
        <button type="button" onClick={handleCancel} style={{ background: '#999', color: 'white' }}>
          ✕ Cancel
        </button>
      </div>
      </form>
    </div>
  );
});

export default StudentForm;
