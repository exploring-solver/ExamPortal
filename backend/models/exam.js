const knex = require('../config/knexfile');

class Exam {
  static async create(examData) {
    return knex('exams').insert(examData);
  }

  static async getAll() {
    return knex('exams').select('*');
  }
}

module.exports = Exam;