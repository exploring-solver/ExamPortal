const Sector = require('../models/sector');

class SectorController {
  static async createSector(request, reply) {
    try {
      const sectorData = request.body;
      console.log('Received sector data:', sectorData); 
      const result = await Sector.create(sectorData);
      console.log('Sector created:', result); 
      reply.code(201).send({ id: result[0], ...sectorData });
    } catch (error) {
      console.error('Error creating sector:', error); 
      reply.code(500).send({ error: 'Internal Server Error', details: error.message });
    }
  }


  static async getSectors(request, reply) {
    try {
      const sectors = await Sector.getAll();
      reply.send(sectors);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}

module.exports = SectorController;