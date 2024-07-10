module.exports = function(fastify) {
    const { knex } = fastify;
  
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
  