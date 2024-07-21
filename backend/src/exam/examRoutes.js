const ExamController = require('./controllers/userController');

async function examRoutes(fastify, options) {
  fastify.get('/', UserController.getAllUsers);
  fastify.get('/:id', UserController.getUserById);
  fastify.post('/', UserController.createUser);
  fastify.delete('/:id', UserController.deleteUserById);
}

module.exports = examRoutes;