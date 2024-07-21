const Exam = require('../models/exam');

class ExamService {
  static async getAllExams() {
    return Exam.query();
  }

  static async getExamById(id) {
    return Exam.query().findById(id);
  }

  static async createExam(data) {
    return Exam.query().insert(data);
  }

  static async deleteExamById(id) {
    return Exam.query().deleteById(id);
  }

  static async getQuestionsForExam(examId) {
    return Exam.query()
      .findById(examId)
      .withGraphFetched('questions');
  }
}

module.exports = ExamService;
