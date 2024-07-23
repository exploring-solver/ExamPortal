const Exam = require('../../../models/exam');

class ExamService {
  static async getAllExams() {
    return Exam.getAll();
  }

  static async getExamById(id) {
    return Exam.getById(id);
  }

  static async createExam(data) {
    return Exam.create(data);
  }

  static async deleteExamById(id) {
    return Exam.deleteById(id);
  }

  static async getQuestionsForExam(examId) {
    return Exam.getQuestionsForExam(examId);
  }

  static async getExamsByCategoryAndSector(category_id, sector_id) {
    return Exam.getExamsByCategoryAndSector(category_id, sector_id);
  }
}

module.exports = ExamService;
