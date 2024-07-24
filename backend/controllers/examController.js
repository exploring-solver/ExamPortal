const Exam = require('../models/exam');
const ExamService = require('../src/exam/services/examService')
class ExamController {

  static async getExamsByCategoryAndSector(request, reply){
    try {
      const { category_id, sector_id } = request.params;
      const exams = await ExamService.getExamsByCategoryAndSector(category_id, sector_id);
      return reply.status(200).send(exams);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while fetching exams');
    }
  };

  static async getExamById(request, reply){
    try {
      const { exam_id } = request.params;
      const exam = await ExamService.getExamById(exam_id);
      return reply.status(200).send(exam);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while fetching exams');
    }
  };

  static async createExam(request, reply) {
    try {
      const examData = request.body;
      const result = await ExamService.create(examData);
      reply.code(201).send({ id: result[0], ...examData });
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  static async createExamForOrganization(request, reply) {
    try {
      const {description, ...examData} = request.body;
      const organizationId = request.params.organizationId; // Get organizationId from params or body
      const result = await ExamService.createExamForOrganization(examData, organizationId);
      reply.code(201).send(result);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  static async getExams(request, reply) {
    try {
      const exams = await ExamService.getAll();
      reply.send(exams);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getExamsByOrganization(request, reply) {
    try {
      const { organizationId } = request.params;
      const exams = await ExamService.getExamsByOrganization(organizationId);
      return reply.status(200).send(exams);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while fetching exams');
    }
  }

  static async deleteExamById(request, reply) {
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