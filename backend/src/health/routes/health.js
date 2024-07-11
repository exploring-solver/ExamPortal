async function healthRoutes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply.send("ExamPortal says hi!");
    });
    fastify.get('/debug', async (request, reply) => {
        try {
            const result = await fastify.knex.raw('SELECT 1+1 as result');
            reply.send({ message: 'Database connection successful', result });
        } catch (error) {
            reply.code(500).send({ error: 'Database connection failed', details: error.message });
        }
    });
}

module.exports = healthRoutes;