const ExamController = require('../controllers/examController');

async function examRoutes(fastify, options) {
  fastify.post('/exams', ExamController.createExam);
  fastify.get('/exams', ExamController.getExams);
  fastify.get('/exams/:category_id/:sector_id', ExamController.getExamsByCategoryAndSector);
}

module.exports = examRoutes;