const { Model } = require('objection');

class QuestionStat extends Model {
  static get tableName() {
    return 'question_stats';
  }
}

module.exports = QuestionStat;
