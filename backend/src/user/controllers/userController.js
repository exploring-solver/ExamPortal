const UserService = require('../services/userService');
const AdminService = require('../services/adminService');
const StudentService = require('../services/studentService');
const OrganizationService = require('../services/organizationService');
const jwt = require('../../../config/jwt');
const bcrypt = require('bcryptjs');

class UserController {

  static async getAllUsers(request, reply) {
    try {
      const users = await UserService.getAllUsers();
      reply.code(200).send(users);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async getUserById(request, reply) {
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

  static async createUser(request, reply) {
    const { role, phone, password, confirmPassword, ...userData } = request.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserService.createUser({ ...userData, password: hashedPassword });

      // Create related record based on role
      if (role === 'student') {
        await StudentService.createStudent({ user_id: newUser.id });
      } else if (role === 'organization') {
        await OrganizationService.createOrganization({ user_id: newUser.id });
      } else if (role === 'admin') {
        await AdminService.createAdmin({ user_id: newUser.id });
      } else {       
        // Rollback
        await UserService.deleteUserById(newUser.id);
        return reply.code(400).send({ error: 'Invalid role' });
      }

      const token = jwt.generateToken(newUser);
      reply.code(201).send({ user: newUser, token });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async deleteUserById(request, reply) {
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

  static async login(request, reply) {
    const { identifier, password } = request.body;
    try {
      const user = await UserService.getUserByUsernameOrEmail(identifier);
      if (!user) {
        return reply.code(401).send({ error: 'Invalid username or password' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return reply.code(401).send({ error: 'Invalid username or password' });
      }

      const token = jwt.generateToken(user);
      reply.code(200).send({ token });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = UserController;
