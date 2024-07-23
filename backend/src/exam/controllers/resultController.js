const ExamQuestion = require('../../question/models/examQuestion');
const Result = require('../models/result');
const QuestionStat = require('../../question/models/questionStat');
const ResultService = require('../services/resultServices');
const Student = require('../../user/models/student');

class ResultController {

  static async getAllResults(request, reply) {
    try {
      const results = await ResultService.getAllResults();
      reply.code(200).send(results);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async getResultById(request, reply) {
    try {
      const studentRecord = await Student.query().where('user_id', request.params.id).first();
      if (!studentRecord) {
        return reply.code(404).send({ error: 'Student not found' });
      }
      const candidate_id = studentRecord.id;
      const result = await ResultService.getResultById(candidate_id);
      if (!result) {
        return reply.code(404).send({ error: 'Result not found' });
      }
      reply.code(200).send(result);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }
  

  static async createResult(request, reply) {
    try {
      const newResult = await ResultService.createResult(request.body);
      reply.code(201).send(newResult);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async deleteResultById(request, reply) {
    try {
      const deleted = await ResultService.deleteResultById(request.params.id);
      if (!deleted) {
        return reply.code(404).send({ error: 'Result not found' });
      }
      reply.code(200).send({ message: 'Result deleted successfully' });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  static async submitExam(request, reply) {
    console.log('Submitting exam:', { examId: request.params.examId, userId: request.body.userId });
    const { examId } = request.params;
    const { answers, userId } = request.body;

    try {
      console.log('Fetching exam questions');
      const examQuestions = await ExamQuestion.query()
        .where('exam_id', examId)
        .withGraphFetched('question');
      console.log('Exam questions fetched:', examQuestions.length);

      let totalScore = 0;
      const maxScore = examQuestions.length * 4;

      for (const eq of examQuestions) {
        const userAnswer = answers[eq.question_id];
        const isCorrect = userAnswer === eq.question.answer;
        console.log('Question:', eq.question_id, 'User Answer:', userAnswer, 'Correct:', isCorrect);

        totalScore += isCorrect ? 4 : -1;

        console.log('Updating question stats');
        await QuestionStat.query()
          .insert({
            question_id: eq.question_id,
            exam_appearances: 1,
            attempted_count: userAnswer ? 1 : 0,
            correct_count: isCorrect ? 1 : 0,
            wrong_count: userAnswer && !isCorrect ? 1 : 0,
          })
          .onConflict('question_id')
          .merge({
            exam_appearances: QuestionStat.raw('exam_appearances + 1'),
            attempted_count: QuestionStat.raw('attempted_count + ?', [userAnswer ? 1 : 0]),
            correct_count: QuestionStat.raw('correct_count + ?', [isCorrect ? 1 : 0]),
            wrong_count: QuestionStat.raw('wrong_count + ?', [userAnswer && !isCorrect ? 1 : 0]),
          });
      }

      console.log(maxScore, Math.max(totalScore, 0), userId, examId);
      const studentRecord = await Student.query().where('user_id', userId).first();
      if (!studentRecord) {
        reply.code(400).send({ error: 'Invalid user ID' });
        return;
      }
      const studentId = studentRecord.id;
      console.log('Creating result');
      const result = await Result.query().insert({
        max_score: maxScore,
        total_score: Math.max(totalScore, 0),
        exam_id: examId,
        candidate_id: studentId,
      });

      console.log('Result created:', result);
      reply.send(result);
    } catch (error) {
      console.error('Error submitting exam:', error);
      if (error.name === 'ForeignKeyViolationError') {
        reply.code(400).send({ error: 'Invalid user ID or exam ID' });
      } else {
        reply.code(500).send({ error: 'Failed to submit exam' });
      }
    }
  }
}

module.exports = ResultController;
