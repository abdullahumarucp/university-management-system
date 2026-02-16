import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, student }) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
      <div>
        <label>Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Course:</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="1"
          max="6"
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button type="submit">{student ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default StudentForm;
