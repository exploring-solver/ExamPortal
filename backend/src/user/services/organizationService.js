const Organization = require('../models/organization');

class OrganizationService {
  static async getAllOrganizations() {
    return Organization.query();
  }

  static async getOrganizationById(id) {
    return Organization.query().findById(id);
  }

  static async getOrganizationIdByUserId(userId) {
    const organization = await Organization.getByUserId(userId); // Fetch organization details by userId
    return organization ? organization.id : null;
  }

  static async createOrganization(data) {
    return Organization.query().insert(data);
  }

  static async deleteOrganizationById(id) {
    return Organization.query().deleteById(id);
  }
}

module.exports = OrganizationService;
