const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);
class Organization extends Model {
  static get tableName() {
    return 'organizations';
  }
}

module.exports = Organization;
