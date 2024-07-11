import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamsList from '../Exam/ExamsList';
import CareerLaunchSection from './CareerLaunchSection';

const Home = () => {
  const [sectors, setSectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedSector, setSelectedSector] = useState(1);

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
    if (selectedSector) {
      const fetchExams = async () => {
        const response = await axios.get(`http://localhost:3000/api/exams?sectorId=${selectedSector}`);
        setExams(response.data);
      };

      fetchExams();
    }
  }, [selectedSector]);

  const handleSectorClick = (sectorId) => {
    setSelectedSector(sectorId);
  };

  return (
    <div>
      <CareerLaunchSection />
      <nav className="bg-home-bar text-white py-2">
        <ul className="container mx-auto px-4 flex justify-between">
          {sectors.map(sector => (
            <li key={sector.id}>
              <button onClick={() => handleSectorClick(sector.id)} className="hover:underline">
                {sector.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">GOVERNMENT ADMINISTRATION EXAMS</h2>
        <div className="flex">
          <div className="w-1/4 pr-4">
            {categories.map(category => (
              <div key={category.id} className="bg-gray-100 p-2 mb-2 rounded">
                {category.name}
              </div>
            ))}
          </div>
          <div className="w-3/4">
            <ExamsList exams={exams} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;