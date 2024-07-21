const { Model } = require('objection');

class Exam extends Model {
  static get tableName() {
    return 'exams';
  }
}

module.exports = Exam;
