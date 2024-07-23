const QuestionService = require('../services/questionService');

class QuestionController {

  static async getAllQuestions(request, reply) {
    try {
      const questions = await QuestionService.getAllQuestions();
      reply.status(200).send(questions);
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  }

  static async getQuestionById(request, reply) {
    try {
      const question = await QuestionService.getQuestionById(request.params.id);
      if (!question) {
        return reply.status(404).send({ error: 'Question not found' });
      }
      reply.status(200).send(question);
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  }

  static async createQuestion(request, reply) {
    try {
      const newQuestion = await QuestionService.createQuestion(request.body);
      reply.status(201).send(newQuestion);
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  }

  static async deleteQuestionById(request, reply) {
    try {
      const deleted = await QuestionService.deleteQuestionById(request.params.id);
      if (!deleted) {
        return reply.status(404).send({ error: 'Question not found' });
      }
      reply.status(200).send({ message: 'Question deleted successfully' });
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  }
}

module.exports = QuestionController;
