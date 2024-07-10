module.exports = function(fastify) {
    const categoryModel = require('../models/categoryModel')(fastify);
  
    const getAllCategories = async (request, reply) => {
      try {
        const categories = await categoryModel.getAllCategories();
        return reply.send(categories);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('An error occurred while fetching categories');
      }
    };
  
    const createCategory = async (request, reply) => {
      try {
        const newCategory = request.body;
        await categoryModel.createCategory(newCategory);
        return reply.status(201).send('Category created successfully');
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('An error occurred while creating the category');
      }
    };
  
    return {
      getAllCategories,
      createCategory,
    };
  };
  