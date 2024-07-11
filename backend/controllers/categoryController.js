const Category = require('../models/category');

class CategoryController {
  static async createCategory(request, reply) {
    try {
      const categoryData = request.body;
      const result = await Category.create(categoryData);
      reply.code(201).send({ id: result[0], ...categoryData });
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getCategories(request, reply) {
    try {
      const categories = await Category.getAll();
      reply.send(categories);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}

module.exports = CategoryController;