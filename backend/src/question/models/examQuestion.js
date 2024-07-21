const { Model } = require('objection');

class ExamQuestion extends Model {
  static get tableName() {
    return 'exam_questions';
  }
}

module.exports = ExamQuestion;
