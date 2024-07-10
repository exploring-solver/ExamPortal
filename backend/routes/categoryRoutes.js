const categoryController = require('../controllers/categoryController');

module.exports = async function(fastify, opts) {
  const controller = categoryController(fastify);

  fastify.get('/categories', controller.getAllCategories);
  fastify.post('/categories', controller.createCategory);
};
