const QuestionStatService = require('../services/questionStatService');

class QuestionStatController {

  static async getAllQuestionStats(req, res) {
    try {
      const questionStats = await QuestionStatService.getAllQuestionStats();
      res.status(200).json(questionStats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getQuestionStatById(req, res) {
    try {
      const questionStat = await QuestionStatService.getQuestionStatById(req.params.id);
      if (!questionStat) {
        return res.status(404).json({ error: 'QuestionStat not found' });
      }
      res.status(200).json(questionStat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createQuestionStat(req, res) {
    try {
      const newQuestionStat = await QuestionStatService.createQuestionStat(req.body);
      res.status(201).json(newQuestionStat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteQuestionStatById(req, res) {
    try {
      const deleted = await QuestionStatService.deleteQuestionStatById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'QuestionStat not found' });
      }
      res.status(200).json({ message: 'QuestionStat deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = QuestionStatController;
