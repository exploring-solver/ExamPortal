const knex = require('knex');

const knexConfig = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'examportal'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  },
  debug: true
};

const db = knex(knexConfig);

module.exports = db;

