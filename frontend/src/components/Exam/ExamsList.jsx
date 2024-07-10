import React from 'react';
import ExamCard from './ExamCard';

const ExamsList = ({ exams }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {exams.map(exam => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  );
};

export default ExamsList;
