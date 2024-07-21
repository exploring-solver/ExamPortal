const StudentService = require('../services/studentService');

class StudentController {

  static async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStudentById(req, res) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createStudent(req, res) {
    try {
      const newStudent = await StudentService.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteStudentById(req, res) {
    try {
      const deleted = await StudentService.deleteStudentById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = StudentController;
