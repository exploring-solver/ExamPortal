import React from 'react';

const ExamsList = ({ exams }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {exams.map(exam => (
        <div key={exam.id} className="border border-but-sky-blue rounded p-3 text-center hover:bg-gray-100 cursor-pointer shadow-lg ">
          <p className=" font-semibold ">{exam.name} - {new Date(exam.exam_date).toLocaleDateString()} ({exam.status})</p>
        </div>
      ))}
    </div>
  );
};

export default ExamsList;