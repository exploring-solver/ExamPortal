const fastify = require('fastify')({ logger: true });
const examRoutes = require('./routes/examRoutes');
const sectorRoutes = require('./routes/sectorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const knex = require('./config/knexfile');

fastify.register(require('fastify-plugin')(async (fastify) => {
  fastify.decorate('knex', knex);
}));

fastify.register(examRoutes);
fastify.register(sectorRoutes);
fastify.register(categoryRoutes);

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server running at http://localhost:3000/`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
