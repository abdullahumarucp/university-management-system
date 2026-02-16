const express = require('express');
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', getStudents);

router.get('/:id', verifyToken, getStudentById);

router.post('/', createStudent);

router.put('/:id', updateStudent);

router.delete('/:id', verifyToken, deleteStudent);

module.exports = router;
