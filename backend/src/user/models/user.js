const { Model } = require('objection');
const knex = require('../../../config/knexfile');
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'student', 'organization'] }
      }
    };
  }
}

module.exports = User;
