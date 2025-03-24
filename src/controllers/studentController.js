const Student = require('../models/Student');

const studentController = {
    // Get all students
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.findAll();
            res.json({
                success: true,
                message: 'Students retrieved successfully',
                data: students
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Get student by ID
    getStudentById: async (req, res) => {
        try {
            const student = await Student.findByPk(req.params.id);
            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }
            res.json({
                success: true,
                message: 'Student retrieved successfully',
                data: student
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Create new student
    createStudent: async (req, res) => {
        try {
            const student = await Student.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Student created successfully',
                data: student
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Update student
    updateStudent: async (req, res) => {
        try {
            const student = await Student.findByPk(req.params.id);
            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }
            await student.update(req.body);
            res.json({
                success: true,
                message: 'Student updated successfully',
                data: student
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Delete student
    deleteStudent: async (req, res) => {
        try {
            const student = await Student.findByPk(req.params.id);
            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }
            await student.destroy();
            res.json({
                success: true,
                message: 'Student deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = studentController;