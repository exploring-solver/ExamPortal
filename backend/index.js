const fastify = require('fastify')({ logger: true });
const examRoutes = require('./routes/examRoutes');
const sectorRoutes = require('./routes/sectorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const knex = require('./config/knexfile'); 

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

fastify.register(examRoutes);
fastify.register(sectorRoutes);
fastify.register(categoryRoutes);

fastify.get('/', async (request, reply) => {
  reply.send("ExamPortal says hi!");
});

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
