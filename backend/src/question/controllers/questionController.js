const ExamQuestionService = require('../services/examQuestionService');

class ExamQuestionController {

  static async getAllExamQuestions(req, res) {
    try {
      const examQuestions = await ExamQuestionService.getAllExamQuestions();
      res.status(200).json(examQuestions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getExamQuestionById(req, res) {
    try {
      const examQuestion = await ExamQuestionService.getExamQuestionById(req.params.id);
      if (!examQuestion) {
        return res.status(404).json({ error: 'ExamQuestion not found' });
      }
      res.status(200).json(examQuestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createExamQuestion(req, res) {
    try {
      const newExamQuestion = await ExamQuestionService.createExamQuestion(req.body);
      res.status(201).json(newExamQuestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteExamQuestionById(req, res) {
    try {
      const deleted = await ExamQuestionService.deleteExamQuestionById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'ExamQuestion not found' });
      }
      res.status(200).json({ message: 'ExamQuestion deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ExamQuestionController;
