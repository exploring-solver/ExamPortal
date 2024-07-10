const fp = require('fastify-plugin');
const knex = require('knex');

const knexPlugin = fp(async function (fastify, opts) {
  const knexInstance = knex({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'aMan@7654$%^&',
      database: 'examportal'
    }
  });

  fastify.decorate('knex', knexInstance);

  fastify.addHook('onClose', (fastifyInstance, done) => {
    fastifyInstance.knex.destroy();
    done();
  });
});

module.exports = knexPlugin;
