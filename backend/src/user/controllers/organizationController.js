const OrganizationService = require('../services/organizationService');

class OrganizationController {

  static async getAllOrganizations(req, res) {
    try {
      const organizations = await OrganizationService.getAllOrganizations();
      res.status(200).json(organizations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrganizationById(req, res) {
    try {
      const organization = await OrganizationService.getOrganizationById(req.params.id);
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      res.status(200).json(organization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createOrganization(req, res) {
    try {
      const newOrganization = await OrganizationService.createOrganization(req.body);
      res.status(201).json(newOrganization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteOrganizationById(req, res) {
    try {
      const deleted = await OrganizationService.deleteOrganizationById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrganizationController;
