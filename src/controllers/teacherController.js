const Teacher = require('../models/Teacher');

const teacherController = {
    // Get all teachers
    getAllTeachers: async (req, res) => {
        try {
            const teachers = await Teacher.findAll();
            res.json({
                success: true,
                message: 'Teachers retrieved successfully',
                data: teachers
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Get teacher by ID
    getTeacherById: async (req, res) => {
        try {
            const teacher = await Teacher.findByPk(req.params.id);
            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: 'Teacher not found'
                });
            }
            res.json({
                success: true,
                message: 'Teacher retrieved successfully',
                data: teacher
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Create new teacher
    createTeacher: async (req, res) => {
        try {
            const teacher = await Teacher.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Teacher created successfully',
                data: teacher
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Update teacher
    updateTeacher: async (req, res) => {
        try {
            const teacher = await Teacher.findByPk(req.params.id);
            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: 'Teacher not found'
                });
            }
            await teacher.update(req.body);
            res.json({
                success: true,
                message: 'Teacher updated successfully',
                data: teacher
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Delete teacher
    deleteTeacher: async (req, res) => {
        try {
            const teacher = await Teacher.findByPk(req.params.id);
            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: 'Teacher not found'
                });
            }
            await teacher.destroy();
            res.json({
                success: true,
                message: 'Teacher deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = teacherController;