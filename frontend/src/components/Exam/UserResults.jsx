import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import jsPDF from 'jspdf';

const UserResults = () => {
  const [results, setResults] = useState([]);
  const [examDetails, setExamDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const payload = decodeToken(token);
  const userId = payload.id;

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const userData = await response.json();
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Fetch exam results and details
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
        console.error('Error fetching exam results:', error);
      }
    };

    fetchUserDetails();
    fetchResults();
  }, [userId]);

  // Function to generate and download PDF with user info
  const downloadPDF = () => {
    const pdf = new jsPDF();
    let yOffset = 20; // Starting y position

    // Add User Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Name: ${userDetails.username}`, 20, yOffset);
    yOffset += 10;
    pdf.text(`Email: ${userDetails.email}`, 20, yOffset);
    yOffset += 20;

    results.forEach((result, index) => {
      const examDetail = examDetails[result.exam_id];

      // Add Exam Name (bold, centered, large font, all caps)
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(examDetail?.name?.toUpperCase() || 'Exam Name', 105, yOffset, { align: 'center' });
      yOffset += 10;

      // Add Exam Date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Exam Date: ${new Date(examDetail?.exam_date).toLocaleDateString()}`, 20, yOffset);
      yOffset += 10;

      // Add Total Score and Max Score
      pdf.text(`Total Score: ${result.total_score}`, 20, yOffset);
      yOffset += 10;
      pdf.text(`Max Score: ${result.max_score}`, 20, yOffset);
      yOffset += 10;

      // Add Result Date
      pdf.text(`Result Date: ${new Date(result.created_at).toLocaleDateString()}`, 20, yOffset);
      yOffset += 20; // Extra space before the next result

      // Add page break if needed
      if (index < results.length - 1 && yOffset > 250) {
        pdf.addPage();
        yOffset = 20; // Reset yOffset for new page
      }
    });

    // Save the PDF with a custom file name
    pdf.save('report-card.pdf');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Exam Results</h2>
      {results.length > 0 ? (
        <>
          <ul className="space-y-4">
            {results.map(result => (
              <li key={result.id} className="border border-gray-300 rounded p-4 shadow-md">
                <p><strong>Exam Name:</strong> {examDetails[result.exam_id]?.name}</p>
                <p><strong>Exam Date:</strong> {new Date(examDetails[result.exam_id]?.exam_date).toLocaleDateString()}</p>
                <p><strong>Total Score:</strong> {result.total_score}</p>
                <p><strong>Max Score:</strong> {result.max_score}</p>
                <p><strong>Result Date:</strong> {new Date(result.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={downloadPDF}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download Report Card as PDF
          </button>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default UserResults;
