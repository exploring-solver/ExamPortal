const ExamService = require('../services/examService');

class ExamController {
  static async getAllExams(request,reply) {
    try {
      const exams = await ExamService.getAllExams();
      reply.code(200).send(exams);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async getExamById(request,reply) {
    try {
      const exam = await ExamService.getExamById(request.params.id);
      if (!exam) {
        return reply.code(404).send({ error: 'Exam not found' });
      }
      reply.code(200).send(exam);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async createExam(request,reply) {
    try {
      const newExam = await ExamService.createExam(request.body);
      reply.code(201).send(newExam);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async deleteExamById(request,reply) {
    try {
      const deleted = await ExamService.deleteExamById(request.params.id);
      if (!deleted) {
        return reply.code(404).send({ error: 'Exam not found' });
      }
      reply.code(200).send({ message: 'Exam deleted successfully' });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async getQuestionsForExam(request,reply) {
    try {
      const questions = await ExamService.getQuestionsForExam(request.params.id);
      reply.code(200).send(questions);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }
}

module.exports = ExamController;
