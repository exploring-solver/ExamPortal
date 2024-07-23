import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExamsList = ({ exams, showCurrentDate }) => {
  const navigate = useNavigate();

  const handleExamClick = (examId, examDate) => {
    const today = new Date();
    const examDay = new Date(examDate);
    if (examDay > today) {
      alert('The exam has not started yet. Please wait till the exam date.');
    } else {
      navigate(`/exam/${examId}`);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {exams.map(exam => (
        <button
          key={exam.id}
          onClick={() => handleExamClick(exam.id, exam.exam_date)}
          className="border border-but-sky-blue rounded p-3 text-center hover:bg-gray-100 cursor-pointer shadow-lg"
        >
          <p className="font-semibold">
            {exam.name} - {new Date(exam.exam_date).toLocaleDateString()}
            {showCurrentDate && new Date(exam.exam_date).toDateString() === new Date().toDateString() && (
              <span className="text-red-500"> (Today)</span>
            )}
          </p>
        </button>
      ))}
    </div>
  );
};

export default ExamsList;
