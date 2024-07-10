import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectorTabs from '../Exam/SectorTabs';
import ExamsList from '../Exam/ExamsList';

const Home = () => {
  const [sectors, setSectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      const response = await axios.get('http://localhost:3000/sectors');
      setSectors(response.data);
    };

    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    };

    fetchSectors();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedSector && selectedCategory) {
      const fetchExams = async () => {
        const response = await axios.get(`http://localhost:3000/exams/${selectedCategory}/${selectedSector}`);
        setExams(response.data);
      };

      fetchExams();
    }
  }, [selectedSector, selectedCategory]);

  const handleSectorClick = (sectorId) => {
    setSelectedSector(sectorId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Career Launch</h1>
      <SectorTabs sectors={sectors} onSectorClick={handleSectorClick} />
      <div className="flex justify-center mt-4">
        {categories.map(category => (
          <button 
            key={category.id} 
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded m-2"
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <ExamsList exams={exams} />
    </div>
  );
};

export default Home;
