import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ExamGuidelines = ({ exam }) => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate(`/exam/${examId}/question/1`);
  };

  return (
    <div className="mt-10 p-4 mx-auto w-[90%] rounded-md bg-blue-gray-100">
      <h1 className="text-2xl font-bold mb-4">{exam.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Exam Guidelines</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Read all questions carefully before answering.</li>
        <li>You will receive +4 points for each correct answer.</li>
        <li>You will receive -1 point for each incorrect answer.</li>
        <li>Unanswered questions will not affect your score.</li>
        <li>You can mark questions for review and return to them later.</li>
      </ul>
      <br />
      <div className='flex justify-center'>
        <button
          onClick={handleProceed}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Proceed to Exam
        </button>
      </div>
    </div>
  );
};

export default ExamGuidelines;