const knex = require('../config/knexfile');

class Exam {
  static async create(examData) {
    return knex('exams').insert(examData);
  }

  static async getAll() {
    return knex('exams').select('*');
  }

  static async getExamsByCategoryAndSector(category_id, sector_id){
    return knex('exams').where({ category_id, sector_id });
  };
}

module.exports = Exam;