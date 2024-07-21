const User = require('../models/user');

const UserService = {
  getAllUsers: () => User.getAll(),
  getUserById: (id) => User.getById(id),
  createUser: (user) => User.create(user),
  deleteUserById: (id) => User.deleteById(id)
};

module.exports = UserService;
