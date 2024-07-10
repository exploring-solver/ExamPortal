import React from 'react';

const ExamCard = ({ exam }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md m-2">
      <h3 className="text-lg font-semibold">{exam.name}</h3>
    </div>
  );
};

export default ExamCard;
