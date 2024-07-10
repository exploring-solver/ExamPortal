module.exports = function(fastify) {
  const knex = fastify.knex;

  const getExamsByCategoryAndSector = async (category_id, sector_id) => {
    return knex('exams').where({ category_id, sector_id });
  };

  const getAllExams = async () => {
    return knex('exams');
  };

  const createExam = async (exam) => {
    return knex('exams').insert(exam);
  };

  return {
    getExamsByCategoryAndSector,
    getAllExams,
    createExam,
  };
};
