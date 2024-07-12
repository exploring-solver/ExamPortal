const knex = require('../config/knexfile');

class Category {
  static async create(categoryData) {
    return knex('categories').insert(categoryData);
  }

  static async getAll() {
    return knex('categories').select('*');
  }
  static async getCategoriesBySectorId(sector_id){
    return knex('categories').where({ sector_id });
  };
}

module.exports = Category;