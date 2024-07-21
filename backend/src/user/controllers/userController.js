const UserService = require('../services/userService');

class UserController {

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUserById(req, res) {
    try {
      const deleted = await UserService.deleteUserById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async createUser(req, res) {
    const { role, ...userData } = req.body;

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
        return res.status(400).json({ error: 'Invalid role' });
      }
      
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = UserController;
