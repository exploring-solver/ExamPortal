//Note: this file is being used

const ExamController = require('../controllers/examController');
const ResultController = require('../src/exam/controllers/resultController');

async function examRoutes(fastify, options) {
  fastify.post('/', ExamController.createExam);
  fastify.get('/', ExamController.getExams);
  fastify.get('/:exam_id', ExamController.getExamById);
  fastify.get('/organization/:organizationId', ExamController.getExamsByOrganization);
  fastify.post('/organization/:organizationId', ExamController.createExamForOrganization);
  fastify.get('/:category_id/:sector_id', ExamController.getExamsByCategoryAndSector);
  fastify.delete('/:id', ExamController.deleteExamById);
  fastify.get('/getall/:id', ExamController.getQuestionsForExam);
  fastify.post('/:examId/result', ResultController.submitExam);
  fastify.get('/:id/result', ResultController.getResultById);
}

module.exports = examRoutes;