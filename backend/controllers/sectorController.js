module.exports = function(fastify) {
    const sectorModel = require('../models/sectorModel')(fastify);
  
    const getAllSectors = async (request, reply) => {
      try {
        const sectors = await sectorModel.getAllSectors();
        return reply.send(sectors);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('An error occurred while fetching sectors');
      }
    };
  
    const createSector = async (request, reply) => {
      try {
        const newSector = request.body;
        await sectorModel.createSector(newSector);
        return reply.status(201).send('Sector created successfully');
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('An error occurred while creating the sector');
      }
    };
  
    return {
      getAllSectors,
      createSector,
    };
  };
  