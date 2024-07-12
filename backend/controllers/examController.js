const Exam = require('../models/exam');

class ExamController {

  static async getExamsByCategoryAndSector(request, reply){
    try {
      const { category_id, sector_id } = request.params;
      const exams = await Exam.getExamsByCategoryAndSector(category_id, sector_id);
      return reply.status(200).send(exams);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while fetching exams');
    }
  };

  static async createExam(request, reply) {
    try {
      const examData = request.body;
      const result = await Exam.create(examData);
      reply.code(201).send({ id: result[0], ...examData });
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getExams(request, reply) {
    try {
      const exams = await Exam.getAll();
      reply.send(exams);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}

module.exports = ExamController;