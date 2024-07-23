const UserController = require('./controllers/userController');

async function userRoutes(fastify, options) {
  fastify.get('/', UserController.getAllUsers);
  fastify.get('/:id', UserController.getUserById);
  fastify.post('/', UserController.createUser);
  fastify.delete('/:id', UserController.deleteUserById);
  fastify.post('/login', UserController.login);
}

module.exports = userRoutes;