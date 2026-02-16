const studentService = require('../services/studentService');

const getStudents = async (req, res) => {
  const result = await studentService.getStudents();
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json(result.data);
};

const getStudentById = async (req, res) => {
  const result = await studentService.getStudentById(req.params.id);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json(result.data);
};

const createStudent = async (req, res) => {
  const result = await studentService.createStudent(req.body);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(201).json(result.data);
};

const updateStudent = async (req, res) => {
  const result = await studentService.updateStudent(req.params.id, req.body);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json(result.data);
};

const deleteStudent = async (req, res) => {
  const result = await studentService.deleteStudent(req.params.id);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json({ message: 'Student deleted' });
};

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
