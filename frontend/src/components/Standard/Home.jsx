import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamsList from '../Exam/ExamsList';
import CareerLaunchSection from './CareerLaunchSection';

const Home = () => {
  const [sectors, setSectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedSector, setSelectedSector] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [examType, setExamType] = useState('all'); // 'all', 'upcoming', or 'previous'
  const currentDate = new Date();

  useEffect(() => {
    const fetchSectors = async () => {
      const response = await axios.get('http://localhost:3000/api/sectors');
      setSectors(response.data);
    };

    fetchSectors();
  }, []);

  useEffect(() => {
    if (selectedSector) {
      const fetchCategories = async () => {
        const response = await axios.get(`http://localhost:3000/api/categories/${selectedSector}`);
        setCategories(response.data);
      };

      fetchCategories();
    }
  }, [selectedSector]);

  useEffect(() => {
    if (selectedSector && selectedCategory) {
      fetchExams();
    }
  }, [selectedSector, selectedCategory, examType]);

  const fetchExams = async () => {
    const response = await axios.get(`http://localhost:3000/api/exams/${selectedCategory}/${selectedSector}`);
    const allExams = response.data;

    let filteredExams;
    if (examType === 'upcoming') {
      filteredExams = allExams.filter(exam => {
        const examDate = new Date(exam.exam_date);
        return examDate >= currentDate || (examDate.toDateString() === currentDate.toDateString());
      });
    } else if (examType === 'previous') {
      filteredExams = allExams.filter(exam => {
        const examDate = new Date(exam.exam_date);
        return examDate < currentDate;
      });
    } else {
      filteredExams = allExams;
    }

    setExams(filteredExams);
  };

  const handleSectorClick = (sectorId) => {
    setSelectedSector(sectorId);
    setSelectedCategory(null);
    setExamType('all');
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setExamType('all');
  };

  const handleExamTypeClick = (type) => {
    setExamType(type);
  };

  return (
    <div className="mx-auto pb-10">
      <CareerLaunchSection />
      <nav className="bg-home-bar text-white py-2">
        <ul className="container mx-auto px-4 flex justify-between py-4">
          {sectors.map(sector => (
            <li key={sector.id}>
              <button
                onClick={() => handleSectorClick(sector.id)}
                className={`hover:underline border-r-2 border-white px-6 h-fit ${selectedSector === sector.id ? 'text-yellow-500 underline' : ''}`}
              >
                {sector.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container mx-auto p-4">
        <div className="flex">
          {categories.length === 0 ? (
            <div className="w-1/4 mr-4 rounded shadow-teal-400 border-r-2 border-b-2 border-but-sky-blue shadow-lg pt-4 bg-cat-bg">
              <p className='px-3 text-lg'>No exams yet</p>
            </div>
          ) : (
            <div className="w-1/4 mr-4 rounded shadow-teal-400 border-r-2 border-b-2 border-but-sky-blue shadow-lg pt-4 bg-cat-bg">
              {categories.map(category => (
                <div key={category.id} className={`bg-cat-bg p-2 border-b-[1px] border-teal-300 ${selectedCategory === category.id ? ' text-white bg-gradient-to-r from-teal-400 from-10% via-sky-500 via-30% to-teal-300 to-90%' : ''}`}>
                  <button onClick={() => handleCategoryClick(category.id)}>
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="w-3/4 text-start">
            <div className="flex justify-between">
              <h2 className="text-lg font- mb-4 text-start">GOVERNMENT ADMINISTRATION EXAMS</h2>
              <div className="flex">
                <button 
                  className={`text-base font- mb-4 border-r-[1px] border-teal-500 px-3 ${examType === 'previous' ? 'text-teal-500' : 'text-gray-500'}`}
                  onClick={() => handleExamTypeClick('previous')}
                >
                  Previous Exams
                </button>
                <button 
                  className={`text-base font- mb-4 px-3 ${examType === 'upcoming' ? 'text-teal-500' : 'text-gray-500'}`}
                  onClick={() => handleExamTypeClick('upcoming')}
                >
                  Upcoming Exams
                </button>
              </div>
            </div>
            {exams.length === 0 ? (
              <p>No exams here yet</p>
            ) : (
              <ExamsList exams={exams} showCurrentDate={examType === 'upcoming'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
