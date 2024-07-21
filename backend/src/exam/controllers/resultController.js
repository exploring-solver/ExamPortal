const ResultService = require('../services/resultService');

class ResultController {

  static async getAllResults(request,reply) {
    try {
      const results = await ResultService.getAllResults();
      reply.code(200).send(results);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async getResultById(request,reply) {
    try {
      const result = await ResultService.getResultById(request.params.id);
      if (!result) {
        return reply.code(404).send({ error: 'Result not found' });
      }
      reply.code(200).send(result);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async createResult(request,reply) {
    try {
      const newResult = await ResultService.createResult(request.body);
      reply.code(201).send(newResult);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async deleteResultById(request,reply) {
    try {
      const deleted = await ResultService.deleteResultById(request.params.id);
      if (!deleted) {
        return reply.code(404).send({ error: 'Result not found' });
      }
      reply.code(200).send({ message: 'Result deleted successfully' });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = ResultController;
