const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);
class Exam extends Model {
  static get tableName() {
    return 'exams';
  }
}

module.exports = Exam;
