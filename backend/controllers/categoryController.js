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
  static async getCategoriesBySectorId(request, reply){
    try {
      const { sector_id } = request.params;
      const categories = await Category.getCategoriesBySectorId(sector_id);
      return reply.status(200).send(categories);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while fetching categories');
    }
  };
}

module.exports = CategoryController;