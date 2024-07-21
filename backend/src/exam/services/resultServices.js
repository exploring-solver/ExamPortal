const Result = require('../models/result');

class ResultService {
  static async getAllResults() {
    return Result.query();
  }

  static async getResultById(id) {
    return Result.query().findById(id);
  }

  static async createResult(data) {
    return Result.query().insert(data);
  }

  static async deleteResultById(id) {
    return Result.query().deleteById(id);
  }
}

module.exports = ResultService;
