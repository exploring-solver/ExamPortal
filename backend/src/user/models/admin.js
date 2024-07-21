const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);
class Admin extends Model {
  static get tableName() {
    return 'admins';
  }
}

module.exports = Admin;
