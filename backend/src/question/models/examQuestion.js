const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);
class ExamQuestion extends Model {
  static get tableName() {
    return 'exam_questions';
  }

  static get relationMappings() {
    const Question = require('./question');

    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'exam_questions.question_id',
          to: 'questions.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['exam_id', 'question_id'],
      properties: {
        id: { type: 'integer' },
        exam_id: { type: 'integer' },
        question_id: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = ExamQuestion;
