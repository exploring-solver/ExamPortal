const Exam = require('../models/exam');

class ExamController {
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