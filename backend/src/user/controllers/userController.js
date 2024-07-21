const UserService = require('../services/userService');
const AdminService = require('../services/adminService');
const StudentService = require('../services/studentService');
const OrganizationService = require('../services/organizationService');

class UserController {

  static async getAllUsers(request,reply) {
    try {
      const users = await UserService.getAllUsers();
      reply.code(200).send(users);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async getUserById(request,reply) {
    try {
      const user = await UserService.getUserById(request.params.id);
      if (!user) {
        return reply.code(404).send({ error: 'User not found' });
      }
      reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async createUser(request,reply) {
    try {
      const newUser = await UserService.createUser(request.body);
      reply.code(201).send(newUser);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async deleteUserById(request,reply) {
    try {
      const deleted = await UserService.deleteUserById(request.params.id);
      if (!deleted) {
        return reply.code(404).send({ error: 'User not found' });
      }
      reply.code(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }
  static async createUser(request, reply) {
    const { role, ...userData } = request.body;

    try {
      // Create user
      const user = await UserService.createUser(userData);
      
      // Create related record based on role
      if (role === 'student') {
        await StudentService.createStudent({ user_id: user.id });
      } else if (role === 'organization') {
        await OrganizationService.createOrganization({ user_id: user.id });
      } else if (role === 'admin') {
        await AdminService.createAdmin({ user_id: user.id });
      } else {
        return reply.code(400).send({ error: 'Invalid role' });
      }
      
      reply.code(201).send(user);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }
}
module.exports = UserController;
