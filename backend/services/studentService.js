const mongoose = require('mongoose');
const Student = require('../models/Student');

const getStudents = async () => {
  try {
    const students = await Student.find();
    return { data: students };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

const getStudentById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: 'Invalid student ID', status: 400 };
    }
    const student = await Student.findById(id);
    if (!student) {
      return { error: 'Student not found', status: 404 };
    }
    return { data: student };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

const createStudent = async (data) => {
  try {
    const { studentId, firstName, lastName, email, phone, course, year, address, dateOfBirth, gender } = data;
    
    if (!studentId || !firstName || !lastName || !email || !course || !year) {
      return { error: 'Required fields are missing', status: 400 };
    }

    const newStudent = new Student({
      studentId,
      firstName,
      lastName,
      email,
      phone,
      course,
      year,
      address,
      dateOfBirth,
      gender
    });
    
    const savedStudent = await newStudent.save();
    return { data: savedStudent };
  } catch (error) {
    if (error.code === 11000) {
      return { error: 'Student ID or email already exists', status: 400 };
    }
    return { error: 'Internal server error', status: 500 };
  }
};

const updateStudent = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: 'Invalid student ID', status: 400 };
    }
    const student = await Student.findById(id);
    if (!student) {
      return { error: 'Student not found', status: 404 };
    }
    
    const { studentId, firstName, lastName, email, phone, course, year, address, dateOfBirth, gender } = data;
    
    if (studentId !== undefined) student.studentId = studentId;
    if (firstName !== undefined) student.firstName = firstName;
    if (lastName !== undefined) student.lastName = lastName;
    if (email !== undefined) student.email = email;
    if (phone !== undefined) student.phone = phone;
    if (course !== undefined) student.course = course;
    if (year !== undefined) student.year = year;
    if (address !== undefined) student.address = address;
    if (dateOfBirth !== undefined) student.dateOfBirth = dateOfBirth;
    if (gender !== undefined) student.gender = gender;
    
    const updatedStudent = await student.save();
    return { data: updatedStudent };
  } catch (error) {
    if (error.code === 11000) {
      return { error: 'Student ID or email already exists', status: 400 };
    }
    return { error: 'Internal server error', status: 500 };
  }
};

const deleteStudent = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: 'Invalid student ID', status: 400 };
    }
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return { error: 'Student not found', status: 404 };
    }
    return { data: true };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
