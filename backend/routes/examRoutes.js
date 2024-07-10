const examController = require('../controllers/examController');

module.exports = async function(fastify, opts) {
  const controller = examController(fastify);

  fastify.get('/exams', controller.getAllExams);
  fastify.get('/exams/filter', controller.getExamsByCategoryAndSector);
  fastify.post('/exams', controller.createExam);
};
