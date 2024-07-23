const UserController = require('./controllers/userController');
const authenticate = require('../middlewares/authMiddleware'); 
const OrganizationController = require('./controllers/organizationController');
async function userRoutes(fastify, options) {
  fastify.get('/', UserController.getAllUsers);
  fastify.get('/:id', UserController.getUserById);
  fastify.get('/organization-id', { preHandler: [authenticate] }, OrganizationController.getOrganizationIdByUserId);
  fastify.post('/', UserController.createUser);
  fastify.delete('/:id', UserController.deleteUserById);
  fastify.post('/login', UserController.login);
}

module.exports = userRoutes;