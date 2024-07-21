const User = require('../models/user');

class UserService {
  static async getAllUsers() {
    return User.query();
  }

  static async getUserById(id) {
    return User.query().findById(id);
  }

  static async createUser(data) {
    return User.query().insert(data);
  }

  static async deleteUserById(id) {
    return User.query().deleteById(id);
  }
}

module.exports = UserService;
