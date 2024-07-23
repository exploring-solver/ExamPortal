const knex = require('../config/knexfile');

class Exam {
  static async create(examData) {
    return knex('exams').insert(examData);
  }

  static async getAll() {
    return knex('exams').select('*');
  }

  static async getById(id) {
    return knex('exams').where({ id }).first();
  }

  static async deleteById(id) {
    return knex('exams').where({ id }).del();
  }

  static async getExamsByCategoryAndSector(category_id, sector_id) {
    return knex('exams').where({ category_id, sector_id });
  }

  static async getQuestionsForExam(examId) {
    return knex('exam_questions').where({ exam_id: examId });
  }
}

module.exports = Exam;
