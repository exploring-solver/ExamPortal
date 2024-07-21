const Admin = require('../models/admin');

class AdminService {
  static async getAllAdmins() {
    return Admin.query();
  }

  static async getAdminById(id) {
    return Admin.query().findById(id);
  }

  static async createAdmin(data) {
    return Admin.query().insert(data);
  }

  static async deleteAdminById(id) {
    return Admin.query().deleteById(id);
  }
}

module.exports = AdminService;
