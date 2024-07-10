module.exports = function (fastify) {
  const knex = fastify.knex;
  const getAllSectors = async () => {
    return knex('sectors');
  };

  const createSector = async (sector) => {
    return knex('sectors').insert(sector);
  };

  return {
    getAllSectors,
    createSector,
  };
};
