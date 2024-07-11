import React from 'react';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';

const ExamsList = ({ exams }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {exams.map(exam => (
        <Card key={exam.id} className="border-blue-500 border-2">
          <CardBody>
          <p className="text-xl font-bold">{exam.name}</p>
            {/* <p>Category ID: {exam.category_id}</p>
            <p>Sector ID: {exam.sector_id}</p>
            <p>Exam Date: {exam.exam_date}</p>
            <p>Status: {exam.status}</p> */}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ExamsList;
