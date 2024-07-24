const { transaction } = require('objection');
const Question = require('../models/question');
const ExamQuestion = require('../models/examQuestion');

class QuestionService {
  static async getAllQuestions() {
    return Question.query();
  }

  static async getQuestionById(id) {
    return Question.query().findById(id);
  }

  static async createQuestion(data) {
    return transaction(Question.knex(), async (trx) => {
      const newQuestion = await Question.query(trx).insert({
        question: data.question,
        option_a: data.option_a,
        option_b: data.option_b,
        option_c: data.option_c,
        option_d: data.option_d,
        answer: data.answer,
        subject: data.subject,
        category: data.category
      });

      await ExamQuestion.query(trx).insert({
        exam_id: data.exam_id,
        question_id: newQuestion.id
      });

      return newQuestion;
    });
  }

  static async deleteQuestionById(id) {
    return transaction(Question.knex(), async (trx) => {
      await ExamQuestion.query(trx).where({ question_id: id }).delete();
      const deletedQuestion = await Question.query(trx).deleteById(id);
      return deletedQuestion;
    });
  }
  
}

module.exports = QuestionService;
