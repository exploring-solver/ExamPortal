module.exports = function(fastify) {
const knex = fastify.knex;  
    const getAllCategories = async () => {
      return knex('categories');
    };
  
    const createCategory = async (category) => {
      return knex('categories').insert(category);
    };
  
    return {
      getAllCategories,
      createCategory,
    };
  };
  