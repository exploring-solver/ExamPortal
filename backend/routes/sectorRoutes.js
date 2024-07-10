const sectorController = require('../controllers/sectorController');

module.exports = async function(fastify, opts) {
  const controller = sectorController(fastify);

  fastify.get('/sectors', controller.getAllSectors);
  fastify.post('/sectors', controller.createSector);
};
