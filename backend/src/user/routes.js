const UserController = require('./controllers/userController');

async function userRoutes(fastify, options) {
  fastify.post('/categories', UserController.createCategory);
  fastify.get('/categories', UserController.getCategories);
  fastify.get('/categories/:sector_id', UserController.getCategoriesBySectorId);
}

module.exports = userRoutes;