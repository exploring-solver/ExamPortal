const ResultService = require('../services/resultService');

class ResultController {

  static async getAllResults(req, res) {
    try {
      const results = await ResultService.getAllResults();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getResultById(req, res) {
    try {
      const result = await ResultService.getResultById(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Result not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createResult(req, res) {
    try {
      const newResult = await ResultService.createResult(req.body);
      res.status(201).json(newResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteResultById(req, res) {
    try {
      const deleted = await ResultService.deleteResultById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Result not found' });
      }
      res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ResultController;
