const CategoryController = require('../controllers/categoryController');

async function categoryRoutes(fastify, options) {
  fastify.post('/categories', CategoryController.createCategory);
  fastify.get('/categories', CategoryController.getCategories);
}

module.exports = categoryRoutes;