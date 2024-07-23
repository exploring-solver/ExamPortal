import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

const UserResults = () => {
  const [results, setResults] = useState([]);
  const [examDetails, setExamDetails] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const payload = decodeToken(token);
  const userId = payload.id;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/exams/${userId}/result`);
        const resultsData = await response.json();
        setResults(resultsData);

        const examDetailsPromises = resultsData.map(result =>
          fetch(`http://localhost:3000/api/exams/${result.exam_id}`)
            .then(res => res.json())
            .then(data => ({ [result.exam_id]: data }))
        );

        const detailsArray = await Promise.all(examDetailsPromises);
        const detailsObject = detailsArray.reduce((acc, detail) => ({ ...acc, ...detail }), {});
        setExamDetails(detailsObject);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResults();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Exam Results</h2>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map(result => (
            <li key={result.id} className="border border-gray-300 rounded p-4 shadow-md">
              <p><strong>Exam Name:</strong> {examDetails[result.exam_id]?.name}</p>
              <p><strong>Exam Date:</strong> {new Date(examDetails[result.exam_id]?.exam_date).toLocaleDateString()}</p>
              <p><strong>Total Score:</strong> {result.total_score}</p>
              <p><strong>Max Score:</strong> {result.max_score}</p>
              <p><strong>Result Date:</strong> {new Date(result.created_at).toLocaleDateString()}</p>
              {/* <button
                onClick={() => navigate(`/exam/${result.exam_id}/result`, { state: { result } })}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </button> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default UserResults;
