//Note: file not in use
const ExamController = require('./controllers/examController');
const ResultController = require('./controllers/resultController');

async function examRoutes(fastify, options) {
  fastify.get('/', ExamController.getAllExams);
  fastify.get('/:id', ExamController.getExamById);
  fastify.post('/', ExamController.createExam);
  fastify.delete('/:id', ExamController.deleteExamById);
  fastify.get('/getall/:id', ExamController.getQuestionsForExam);
  fastify.post('/:examId/result', ResultController.submitExam);
}

module.exports = examRoutes;