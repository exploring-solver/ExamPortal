const Exam = require('../../../models/exam');
const ExamOrganization = require('../models/examOrganization'); // Import the model if it exists

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
    return Exam.deleteById(id);
  }

  static async getQuestionsForExam(examId) {
    return Exam.getQuestionsForExam(examId);
  }

  static async getExamsByCategoryAndSector(category_id, sector_id) {
    return Exam.getExamsByCategoryAndSector(category_id, sector_id);
  }
}

module.exports = ExamService;
