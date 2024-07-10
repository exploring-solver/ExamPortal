module.exports = function(fastify) {
  const examModel = require('../models/examModel')(fastify);

  const getExamsByCategoryAndSector = async (request, reply) => {
    try {
      const { category_id, sector_id } = request.query;
      const exams = await examModel.getExamsByCategoryAndSector(category_id, sector_id);
      return reply.status(200).send(exams);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while fetching exams');
    }
  };

  const getAllExams = async (request, reply) => {
    try {
      const exams = await examModel.getAllExams();
      return reply.status(200).send(exams);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while fetching all exams');
    }
  };

  const createExam = async (request, reply) => {
    try {
      const newExam = request.body;
      await examModel.createExam(newExam);
      return reply.status(201).send('Exam created successfully');
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('An error occurred while creating the exam');
    }
  };

  return {
    getExamsByCategoryAndSector,
    getAllExams,
    createExam,
  };
};
