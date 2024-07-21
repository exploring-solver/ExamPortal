const knex = require('../config/knexfile');

const User = {
  getAll: () => knex('users').select('*'),
  getById: (id) => knex('users').where({ id }).first(),
  create: (user) => knex('users').insert(user),
  deleteById: (id) => knex('users').where({ id }).del()
};

module.exports = User;
