import React from 'react';
import rightImg from "../../assets/rightimg.png";
import leftImg from "../../assets/leftimg.png";

const CareerLaunchSection = () => {
  return (
    <div className="bg-white p-6 md:p-10">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img src="logo.png" alt="Career Launch Icon" className="w-64 mr-3" />

        </div>
        <div className="flex items-center">
          <input type="search" placeholder="Search..." className="border rounded-full px-4 py-2 border-teal-500 mr-4" />
          <a href="#" className="text-teal-500 hover:underline">Sign up / Login Here</a>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 flex flex-wrap">
          <div className="flex mb-6">
            <img src={leftImg} alt="Career Launch Icon" className="mr-3 w-[300px]" />

          </div>
          <div>
            <p className="text-lg mb-6 text-teal-500 w-[400px]">
              Ready to take the next step in your career? Discover exciting
              job openings in various sectors and unlock your potential
              with a fulfilling new role
            </p>
            <div className="space-y-4">
              <button className="w-full bg-teal-500 text-white py-3 rounded-full font-bold">JOBS</button>
              <button className="w-full bg-white text-teal-500 py-3 rounded-full font-bold border border-teal-500">ACADEMICS</button>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img src={rightImg} alt="Interview Illustration" className="w-[300px]"  />
        </div>
      </div>
    </div>
  );
};

export default CareerLaunchSection;