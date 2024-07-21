const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);
class Student extends Model {
  static get tableName() {
    return 'students';
  }
}

module.exports = Student;
