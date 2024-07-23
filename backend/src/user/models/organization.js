const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);
class Organization extends Model {
  static get tableName() {
    return 'organizations';
  }

  static async getByUserId(userId) {
    return knex('organizations').where({ user_id: userId }).first();
  }
}

module.exports = Organization;
