const Exam = require('../../../models/exam');
const ExamOrganization = require('../models/examOrganization'); // Import the model if it exists
const ExamQuestion = require('../../question/models/examQuestion');
const { transaction } = require('objection');

class ExamService {
  static async getAllExams() {
    return Exam.getAll();
  }

  static async getExamById(id) {
    return Exam.getById(id);
  }

  static async getExamsByOrganization(organizationId) {
    return Exam.getExamsByOrganization(organizationId);
  }

  static async createExam(data) {
    return Exam.create(data);
  }

  static async createExamForOrganization(examData, organizationId) {
    // Create the exam
    const result = await Exam.create(examData);
    const examId = result[0];

    // Link the exam to the organization
    await ExamOrganization.create({
      exam_id: examId,
      organization_id: organizationId
    });

    return { id: examId, ...examData };
  }

  static async deleteExamById(id) {
    return transaction(Exam.knex(), async (trx) => {
      // Delete related exam_questions
      await ExamQuestion.query(trx).where({ exam_id: id }).delete();
      // Delete the exam
      const deletedExam = await Exam.query(trx).deleteById(id);
      return deletedExam;
    });
  }

  static async getQuestionsForExam(examId) {
    return Exam.getQuestionsForExam(examId);
  }

  static async getExamsByCategoryAndSector(category_id, sector_id) {
    return Exam.getExamsByCategoryAndSector(category_id, sector_id);
  }
}

module.exports = ExamService;
