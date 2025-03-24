const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// GET all teachers
router.get('/', teacherController.getAllTeachers);

// GET teacher by ID
router.get('/:id', teacherController.getTeacherById);

// POST new teacher
router.post('/', teacherController.createTeacher);

// PUT update teacher
router.put('/:id', teacherController.updateTeacher);

// DELETE teacher
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;