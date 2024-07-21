const Student = require('../models/student');

class StudentService {
  static async getAllStudents() {
    return Student.query();
  }

  static async getStudentById(id) {
    return Student.query().findById(id);
  }

  static async createStudent(data) {
    return Student.query().insert(data);
  }

  static async deleteStudentById(id) {
    return Student.query().deleteById(id);
  }
}

module.exports = StudentService;
