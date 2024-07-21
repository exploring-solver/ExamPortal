const fastify = require('fastify')({ logger: true });
const examRoutes = require('./routes/examRoutes');
const sectorRoutes = require('./routes/sectorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const knex = require('./config/knexfile');
const healthRoutes = require('./src/health/routes/health');
const userRoutes = require('./src/user/userRoutes');

fastify.register(require('@fastify/formbody'));
fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

fastify.register(require('fastify-plugin')(async (fastify) => {
  fastify.decorate('knex', knex);
}));


//Routes
fastify.register(examRoutes , { prefix: '/api' });
fastify.register(sectorRoutes, { prefix: '/api' });
fastify.register(categoryRoutes , { prefix: '/api' });
fastify.register(userRoutes , { prefix: '/api/users' });
fastify.register(healthRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
