const Result = require('../models/result');

class ResultService {
  static async getAllResults() {
    return Result.query();
  }

  static async getResultById(candidate_id) {
    return Result.query().where('candidate_id', candidate_id);
  }

  static async createResult(data) {
    return Result.query().insert(data);
  }

  static async deleteResultById(id) {
    return Result.query().deleteById(id);
  }
}

module.exports = ResultService;
