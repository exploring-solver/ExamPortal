const QuestionController = require('./controllers/questionController');

async function questionRoutes(fastify, options) {
    fastify.get('/', QuestionController.getAllQuestions);
    fastify.get('/:id', QuestionController.getQuestionById);
    fastify.post('/', QuestionController.createQuestion);
    fastify.delete('/:id', QuestionController.deleteQuestionById);
}

module.exports = questionRoutes;
