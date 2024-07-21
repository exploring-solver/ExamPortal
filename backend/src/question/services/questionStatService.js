const QuestionStat = require('../models/questionStat');

class QuestionStatService {
  static async getAllQuestionStats() {
    return QuestionStat.query();
  }

  static async getQuestionStatById(id) {
    return QuestionStat.query().findById(id);
  }

  static async createQuestionStat(data) {
    return QuestionStat.query().insert(data);
  }

  static async deleteQuestionStatById(id) {
    return QuestionStat.query().deleteById(id);
  }
}

module.exports = QuestionStatService;
