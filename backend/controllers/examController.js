module.exports = function(fastify) {
    const examModel = require('../models/examModel')(fastify);
  
    const getExams = async (request, reply) => {
      try {
        const { category, sector } = request.params;
        const exams = await examModel.getExamsByCategoryAndSector(category, sector);
        return reply.send(exams);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('An error occurred while fetching exams');
      }
    };
  
    return {
      getExams,
    };
  };
  