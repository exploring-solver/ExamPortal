const { Model } = require('objection');
const knex = require('../../../config/knexfile');

Model.knex(knex);

class QuestionStat extends Model {
  static get tableName() {
    return 'question_stats';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['question_id'],
      properties: {
        question_id: { type: 'integer' },
        exam_appearances: { type: 'integer' },
        attempted_count: { type: 'integer' },
        correct_count: { type: 'integer' },
        wrong_count: { type: 'integer' },
      },
    };
  }
}

module.exports = QuestionStat;