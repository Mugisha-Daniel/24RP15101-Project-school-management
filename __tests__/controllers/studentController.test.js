const request = require('supertest');
const express = require('express');
const studentController = require('../../src/controllers/studentController');

const app = express();
app.use(express.json());

// Mock the Student model
jest.mock('../../src/models/Student', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn()
}));

// Get the mocked Student model
const Student = require('../../src/models/Student');

// Setup routes
app.get('/api/students', studentController.getAllStudents);
app.get('/api/students/:id', studentController.getStudentById);
app.post('/api/students', studentController.createStudent);
app.put('/api/students/:id', studentController.updateStudent);
app.delete('/api/students/:id', studentController.deleteStudent);

describe('Student Controller', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /api/students', () => {
    it('should return all students', async () => {
      const mockStudents = [
        { id: 1, name: 'John Doe', grade: '10th' },
        { id: 2, name: 'Jane Smith', grade: '11th' }
      ];

      Student.findAll.mockResolvedValue(mockStudents);

      const res = await request(app).get('/api/students');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Students retrieved successfully',
        data: mockStudents
      });
      expect(Student.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/students', () => {
    it('should create a new student', async () => {
      const newStudent = { name: 'New Student', grade: '9th' };
      const createdStudent = { id: 1, ...newStudent };

      Student.create.mockResolvedValue(createdStudent);

      const res = await request(app)
        .post('/api/students')
        .send(newStudent);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        success: true,
        message: 'Student created successfully',
        data: createdStudent
      });
      expect(Student.create).toHaveBeenCalledWith(newStudent);
    });
  });

  describe('PUT /api/students/:id', () => {
    it('should update an existing student', async () => {
      const studentId = 1;
      const updateData = { name: 'Updated Name', grade: '12th' };
      const updatedStudent = { id: studentId, ...updateData };

      const mockStudent = { id: studentId };
      mockStudent.update = jest.fn().mockResolvedValue(updatedStudent);
      Student.findByPk.mockResolvedValue(mockStudent);

      const res = await request(app)
        .put(`/api/students/${studentId}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Student updated successfully',
        data: mockStudent
      });
      expect(Student.findByPk).toHaveBeenCalledWith(studentId);

      const res = await request(app)
        .put(`/api/students/${studentId}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Student updated successfully',
        data: updatedStudent
      });
      expect(Student.findByPk).toHaveBeenCalledWith(studentId);
    });
  });
});