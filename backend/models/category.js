const knex = require('../config/knexfile');

class Category {
  static async create(categoryData) {
    return knex('categories').insert(categoryData);
  }

  static async getAll() {
    return knex('categories').select('*');
  }
}

module.exports = Category;