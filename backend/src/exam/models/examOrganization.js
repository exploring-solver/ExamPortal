// src/models/examOrganization.js

const knex = require('../../../config/knexfile');// Adjust path as necessary

class ExamOrganization {
  static async create({ exam_id, organization_id }) {
    return knex('exam_organization').insert({ exam_id, organization_id });
  }
}

module.exports = ExamOrganization;
