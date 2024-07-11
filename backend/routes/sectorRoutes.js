const SectorController = require('../controllers/sectorController');

async function sectorRoutes(fastify, options) {
  fastify.post('/sectors', SectorController.createSector);
  fastify.get('/sectors', SectorController.getSectors);
}

module.exports = sectorRoutes;