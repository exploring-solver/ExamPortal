const knex = require('knex');

const knexConfig = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'aMan@7654$%^&',
    database: 'examportal'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

module.exports = knex(knexConfig);
