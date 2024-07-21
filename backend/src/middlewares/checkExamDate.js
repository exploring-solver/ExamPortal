const Exam = require('../../models/exam');

const checkExamDate = async (request,reply, next) => {
  try {
    const examId = request.params.examId;
    const exam = await Exam.query().findById(examId);

    if (!exam) {
      return reply.code(404).send({ error: 'Exam not found' });
    }

    const currentDate = new Date();
    const examDate = new Date(exam.exam_date);

    if (currentDate < examDate) {
      return reply.code(400).send({ error: 'Exam not started yet' });
    }

    next();
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

module.exports = checkExamDate;
