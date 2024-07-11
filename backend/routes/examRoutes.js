const ExamController = require('../controllers/examController');

async function examRoutes(fastify, options) {
  fastify.post('/exams', ExamController.createExam);
  fastify.get('/exams', ExamController.getExams);
}

module.exports = examRoutes;