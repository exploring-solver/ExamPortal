import React from 'react';
import rightImg from "../../assets/rightimg.png";
import leftImg from "../../assets/leftimg.png";

const CareerLaunchSection = () => {
  return (
    <div className="bg-white p-6 md:p-10">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img src="logo.png" alt="Career Launch Icon" className="w-16 h-16 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-but-sky-blue">Career Launch</h1>
            <p className="text-sm text-gray-600">Transform Dreams into Careers</p>
          </div>
        </div>
        <div className="flex items-center">
          <input type="search" placeholder="Search..." className="border rounded-l px-4 py-2 border-but-sky-blue" />
          <button className="bg-but-sky-blue text-white px-4 py-2 rounded-r">Search</button>
          <a href="#" className="text-but-sky-blue hover:underline ml-4">Sign up / Login Here</a>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 flex flex-wrap">
          <img src={leftImg} alt="Career Opportunities" className="w-full mb-6" />
          <div>
            <p className="text-lg mb-6 text-gray-700">
              Ready to take the next step in your career? Discover exciting
              job openings in various sectors and unlock your potential
              with a fulfilling new role
            </p>
            <div className="space-y-4">
              <button className="w-full bg-but-sky-blue text-white py-3 rounded-md font-bold">JOBS</button>
              <button className="w-full bg-white text-but-sky-blue py-3 rounded-md font-bold border border-but-sky-blue">ACADEMICS</button>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img src={rightImg} alt="Interview Illustration" className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default CareerLaunchSection;