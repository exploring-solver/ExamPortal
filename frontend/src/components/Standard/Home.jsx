import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectorTabs from '../Exam/SectorTabs';
import ExamsList from '../Exam/ExamsList';
import { Button } from '@material-tailwind/react';
import CareerLaunchSection from './CareerLaunchSection';

const Home = () => {
  const [sectors, setSectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedSector, setSelectedSector] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);

  useEffect(() => {
    const fetchSectors = async () => {
      const response = await axios.get('http://localhost:3000/api/sectors');
      setSectors(response.data);
    };

    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    };

    fetchSectors();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedSector && selectedCategory) {
      const fetchExams = async () => {
        const response = await axios.get(`http://localhost:3000/api/exams?sectorId=${selectedSector}&categoryId=${selectedCategory}`);
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
      <CareerLaunchSection/>
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">Career Launch</h1>
      <SectorTabs sectors={sectors} onSectorClick={handleSectorClick} />
      <div className="flex justify-center mt-6">
        {categories.map(category => (
          <Button 
            key={category.id} 
            color="blue"
            className="mx-2"
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <ExamsList exams={exams} />
    </div>
  );
};

export default Home;
