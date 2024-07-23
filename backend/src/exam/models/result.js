const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);
class Result extends Model {
  static get tableName() {
    return 'exam_results';
  }
}

module.exports = Result;
