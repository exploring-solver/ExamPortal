const AdminService = require('../services/adminService');

class AdminController {

  static async getAllAdmins(req, res) {
    try {
      const admins = await AdminService.getAllAdmins();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAdminById(req, res) {
    try {
      const admin = await AdminService.getAdminById(req.params.id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createAdmin(req, res) {
    try {
      const newAdmin = await AdminService.createAdmin(req.body);
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteAdminById(req, res) {
    try {
      const deleted = await AdminService.deleteAdminById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AdminController;
