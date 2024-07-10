const examController = require('../controllers/examController');

module.exports = async function(fastify, opts) {
  const controller = examController(fastify);

  fastify.get('/exams/:category/:sector', controller.getExams);
};