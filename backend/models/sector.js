const db = require('../config/knexfile');

class Sector {
  static async create(sectorData) {
    return db('sectors').insert(sectorData);
  }

  static async getAll() {
    return db('sectors').select('*');
  }
}

module.exports = Sector;