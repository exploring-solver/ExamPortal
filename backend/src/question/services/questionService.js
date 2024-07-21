const Question = require('../models/question');

class QuestionService {
  static async getAllQuestions() {
    return Question.query();
  }

  static async getQuestionById(id) {
    return Question.query().findById(id);
  }

  static async createQuestion(data) {
    return Question.query().insert(data);
  }

  static async deleteQuestionById(id) {
    return Question.query().deleteById(id);
  }
}

module.exports = QuestionService;
