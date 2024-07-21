const ExamQuestion = require('../models/examQuestion');

class ExamQuestionService {
  static async getAllExamQuestions() {
    return ExamQuestion.query();
  }

  static async getExamQuestionById(id) {
    return ExamQuestion.query().findById(id);
  }

  static async createExamQuestion(data) {
    return ExamQuestion.query().insert(data);
  }

  static async deleteExamQuestionById(id) {
    return ExamQuestion.query().deleteById(id);
  }
}

module.exports = ExamQuestionService;
