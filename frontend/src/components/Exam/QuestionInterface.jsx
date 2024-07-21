import React, { useState } from 'react';

const QuestionInterface = () => {
  const [answered, setAnswered] = useState(0);
  const [notAnswered, setNotAnswered] = useState(1);
  const [notVisited, setNotVisited] = useState(89);
  const [markedForReview, setMarkedForReview] = useState(0);

  return (
    <div className="mb-10">
      <div className="bg-orange-400 text-white p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="bg-white text-orange-400 px-4 py-1">JEE MAIN</button>
          <button className="bg-blue-500 px-4 py-1">PHYSICS</button>
          <button className="bg-blue-500 px-4 py-1">CHEMISTRY</button>
          <button className="bg-blue-500 px-4 py-1">MATHEMATICS</button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center flex-wrap space-x-2">
            <span>DOWNLOAD PAPER IN:</span>
            <button className="bg-blue-500 px-4 py-1 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span>Paper Language:</span>
            <select className="bg-white text-black px-2 py-1">
              <option>English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between px-4">
        <div className="w-3/4 pr-4">
          <div className="border p-4">
            <h2 className="text-lg font-semibold mb-2">Question 1:</h2>
            <p className="mb-4">
              The characteristic distance at which quantum gravitational effects are significant, the Planck length, can be determined from a suitable combination of the fundamental physical constants G, h and c. Which of the following correctly gives the Planck length?
            </p>
            <div className="space-y-2">
              <div>(1) G h² c³</div>
              <div>(2) G² h c</div>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2">SAVE & NEXT</button>
            <button className="bg-orange-400 text-white px-4 py-2">SAVE & MARK FOR REVIEW</button>
            <button className="bg-gray-300 text-black px-4 py-2">CLEAR RESPONSE</button>
            <button className="bg-blue-500 text-white px-4 py-2">MARK FOR REVIEW & NEXT</button>
          </div>
          <div className="mt-4 flex justify-between">
            <button className="bg-gray-300 text-black px-4 py-2">&lt;&lt; BACK</button>
            <button className="bg-gray-300 text-black px-4 py-2">NEXT &gt;&gt;</button>
          </div>
        </div>
        <div className="">
          <div className="bg-gray-100 p-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-300 p-2">{notVisited} Not Visited</div>
              <div className="bg-red-500 text-white p-2">{notAnswered} Not Answered</div>
              <div className="bg-green-500 text-white p-2">{answered} Answered</div>
              <div className="bg-purple-500 text-white p-2">{markedForReview} Marked for Review</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {[...Array(64)].map((_, i) => (
              <button key={i} className={`p-2 text-center ${i === 0 ? 'bg-orange-400 text-white' : 'bg-gray-300'}`}>
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionInterface;