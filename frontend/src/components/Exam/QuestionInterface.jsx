// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { decodeToken } from 'react-jwt';

// const QuestionInterface = () => {
//   const { examId } = useParams();
//   const navigate = useNavigate();
//   const [exam, setExam] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [examState, setExamState] = useState({
//     answered: 0,
//     notAnswered: 0,
//     notVisited: 0,
//     markedForReview: 0,
//     userAnswers: {},
//     questionStatus: {}
//   });
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const fetchExamData = useCallback(async () => {
//     try {
//       const examResponse = await fetch(`http://localhost:3000/api/exams/${examId}`);
//       const examData = await examResponse.json();
//       setExam(examData);

//       const questionsResponse = await fetch(`http://localhost:3000/api/exams/getall/${examId}`);
//       const questionsData = await questionsResponse.json();
//       setQuestions(questionsData);

//       const storedState = JSON.parse(localStorage.getItem(`exam_${examId}_state`) || '{}');
//       setExamState(prevState => ({
//         ...prevState,
//         notAnswered: questionsData.length,
//         notVisited: questionsData.length - 1,
//         ...storedState
//       }));

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching exam data:', error);
//       setLoading(false);
//     }
//   }, [examId]);

//   useEffect(() => {
//     fetchExamData();
//   }, [fetchExamData]);

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       if (questions.length > 0 && currentQuestionIndex < questions.length) {
//         try {
//           const response = await fetch(`http://localhost:3000/api/questions/${questions[currentQuestionIndex].question_id}`);
//           const questionData = await response.json();
//           setCurrentQuestion(questionData);
//           setSelectedOption(examState.userAnswers[questionData.id] || null);
//         } catch (error) {
//           console.error('Error fetching question:', error);
//         }
//       }
//     };

//     fetchQuestion();
//   }, [currentQuestionIndex, questions, examState.userAnswers]);

//   useEffect(() => {
//     localStorage.setItem(`exam_${examId}_state`, JSON.stringify(examState));
//   }, [examId, examState]);

//   if (loading) {
//     return <div>Loading exam questions...</div>;
//   }

//   const updateExamState = (updates) => {
//     setExamState(prevState => {
//       const newState = { ...prevState, ...updates };
//       localStorage.setItem(`exam_${examId}_state`, JSON.stringify(newState));
//       return newState;
//     });
//   };

//   const handleAnswer = (answer) => {
//     const isNewAnswer = !examState.userAnswers[currentQuestion.id];
//     setSelectedOption(answer);
//     updateExamState({
//       userAnswers: { ...examState.userAnswers, [currentQuestion.id]: answer },
//       questionStatus: { ...examState.questionStatus, [currentQuestionIndex]: 'answered' },
//       answered: isNewAnswer ? examState.answered + 1 : examState.answered,
//       notAnswered: isNewAnswer ? examState.notAnswered - 1 : examState.notAnswered
//     });
//   };

//   const handleSaveAndNext = () => {
//     if (selectedOption) {
//       handleAnswer(selectedOption);
//     } else if (examState.questionStatus[currentQuestionIndex] !== 'answered') {
//       updateExamState({
//         questionStatus: { ...examState.questionStatus, [currentQuestionIndex]: 'visited' }
//       });
//     }
//     handleNext();
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       updateExamState({
//         notVisited: Math.max(examState.notVisited - 1, 0)
//       });
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleMarkForReview = () => {
//     updateExamState({
//       markedForReview: examState.markedForReview + 1,
//       questionStatus: { ...examState.questionStatus, [currentQuestionIndex]: 'review' }
//     });
//   };

//   const handleSubmit = async () => {
//     if (window.confirm("Are you sure you want to submit the exam?")) {
//       setSubmitting(true);
//       try {
//         const token = localStorage.getItem('token');
//         const payload = decodeToken(token);

//         const response = await fetch(`http://localhost:3000/api/exams/${examId}/result`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ answers: examState.userAnswers, userId: payload.id }),
//         });

//         const result = await response.json();
//         console.log('Exam submitted successfully:', result);
//         localStorage.removeItem(`exam_${examId}_state`);
//         navigate(`/exam/${examId}/result`, { state: { result } });
//       } catch (error) {
//         console.error('Error submitting exam:', error);
//         alert('Failed to submit exam. Please try again.');
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   };

//   if (!currentQuestion) {
//     return <div>Loading question...</div>;
//   }

//   return (
//     <div className="mb-10">
//       <div className="bg-orange-400 text-white p-2 flex justify-between items-center">
//         <div className="flex space-x-2">
//           <button className="bg-white text-orange-400 px-4 py-1">{exam.name}</button>
//           {/* <button className="bg-blue-500 px-4 py-1">PHYSICS</button>
//           <button className="bg-blue-500 px-4 py-1">CHEMISTRY</button>
//           <button className="bg-blue-500 px-4 py-1">MATHEMATICS</button> */}
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center flex-wrap space-x-2">
//             <span>DOWNLOAD PAPER IN:</span>
//             <button className="bg-blue-500 px-4 py-1 flex items-center">
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//               </svg>
//               DOWNLOAD
//             </button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span>Paper Language:</span>
//             <select className="bg-white text-black px-2 py-1">
//               <option>English</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 flex justify-between px-4">
//         <div className="w-3/4 pr-4">
//           <div className="border p-4">
//             <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}:</h2>
//             <p className="mb-4">{currentQuestion.question}</p>
//             <div className="space-y-2">
//               {['A', 'B', 'C', 'D'].map((option) => (
//                 <button
//                   key={option}
//                   onClick={() => handleAnswer(option)}
//                   className={`w-full text-left p-2 border rounded ${selectedOption === option ? 'bg-green-200' : ''
//                     }`}
//                 >
//                   {option}. {currentQuestion[`option_${option.toLowerCase()}`]}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="mt-4 flex space-x-2">
//             <button onClick={handleSaveAndNext} className="bg-green-500 text-white px-4 py-2">SAVE & NEXT</button>
//             <button onClick={handleMarkForReview} className="bg-orange-400 text-white px-4 py-2">SAVE & MARK FOR REVIEW</button>
//             <button onClick={() => setSelectedOption(null)} className="bg-gray-300 text-black px-4 py-2">CLEAR RESPONSE</button>
//             <button onClick={handleMarkForReview} className="bg-blue-500 text-white px-4 py-2">MARK FOR REVIEW & NEXT</button>
//           </div>
//           <div className="mt-4 flex justify-between">
//             <button onClick={handlePrevious} className="bg-gray-300 text-black px-4 py-2">&lt;&lt; BACK</button>
//             <button onClick={handleNext} className="bg-gray-300 text-black px-4 py-2">NEXT &gt;&gt;</button>
//           </div>
//           <button onClick={handleSubmit} className="mt-4 bg-red-500 text-white px-4 py-2 w-full">SUBMIT EXAM</button>
//         </div>
//         <div className="">
//           <div className="bg-gray-100 p-4">
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div className="bg-gray-300 p-2">{examState.notVisited} Not Visited</div>
//               <div className="bg-red-500 text-white p-2">{examState.notAnswered} Not Answered</div>
//               <div className="bg-green-500 text-white p-2">{examState.answered} Answered</div>
//               <div className="bg-purple-500 text-white p-2">{examState.markedForReview} Marked for Review</div>
//             </div>
//           </div>
//           <div className="mt-4 grid grid-cols-8 gap-2">
//             {questions.map((_, i) => {
//               let bgColor = 'bg-gray-300'; // Not visited
//               if (examState.questionStatus[i] === 'answered') bgColor = 'bg-green-500';
//               else if (examState.questionStatus[i] === 'visited') bgColor = 'bg-red-500';
//               else if (examState.questionStatus[i] === 'review') bgColor = 'bg-purple-500';

//               return (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentQuestionIndex(i)}
//                   className={`p-2 text-center ${i === currentQuestionIndex ? 'bg-orange-400 text-white' : bgColor}`}
//                 >
//                   {String(i + 1).padStart(2, '0')}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       {submitting && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded">
//             <p>Calculating result...</p>
//             {/* Add a spinner here */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionInterface;

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

const QuestionInterface = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [examState, setExamState] = useState({
    answered: 0,
    notAnswered: 0,
    notVisited: 0,
    markedForReview: 0,
    userAnswers: {},
    questionStatus: {}
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds

  const fetchExamData = useCallback(async () => {
    try {
      const examResponse = await fetch(`http://localhost:3000/api/exams/${examId}`);
      const examData = await examResponse.json();
      setExam(examData);

      const questionsResponse = await fetch(`http://localhost:3000/api/exams/getall/${examId}`);
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData);

      const storedState = JSON.parse(localStorage.getItem(`exam_${examId}_state`) || '{}');
      setExamState(prevState => ({
        ...prevState,
        notAnswered: questionsData.length,
        notVisited: questionsData.length - 1,
        ...storedState
      }));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setLoading(false);
    }
  }, [examId]);

  // Timer setup and management
  useEffect(() => {
    const startTime = localStorage.getItem(`exam_${examId}_start_time`);

    if (!startTime) {
      const now = Date.now();
      localStorage.setItem(`exam_${examId}_start_time`, now);
    } else {
      const elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      setTimeLeft(prev => Math.max(3 * 60 * 60 - elapsedTime, 0));
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          handleSubmit(); // Auto-submit exam when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [examId]);

  useEffect(() => {
    fetchExamData();
  }, [fetchExamData]);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (questions.length > 0 && currentQuestionIndex < questions.length) {
        try {
          const response = await fetch(`http://localhost:3000/api/questions/${questions[currentQuestionIndex].question_id}`);
          const questionData = await response.json();
          setCurrentQuestion(questionData);
          setSelectedOption(examState.userAnswers[questionData.id] || null);
        } catch (error) {
          console.error('Error fetching question:', error);
        }
      }
    };

    fetchQuestion();
  }, [currentQuestionIndex, questions, examState.userAnswers]);

  useEffect(() => {
    localStorage.setItem(`exam_${examId}_state`, JSON.stringify(examState));
  }, [examId, examState]);

  // Function to format time in hh:mm:ss
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div>Loading exam questions...</div>;
  }

  const updateExamState = (updates) => {
    setExamState(prevState => {
      const newState = { ...prevState, ...updates };
      localStorage.setItem(`exam_${examId}_state`, JSON.stringify(newState));
      return newState;
    });
  };

  const handleAnswer = (answer) => {
    const isNewAnswer = !examState.userAnswers[currentQuestion.id];
    setSelectedOption(answer);
    updateExamState({
      userAnswers: { ...examState.userAnswers, [currentQuestion.id]: answer },
      questionStatus: { ...examState.questionStatus, [currentQuestionIndex]: 'answered' },
      answered: isNewAnswer ? examState.answered + 1 : examState.answered,
      notAnswered: isNewAnswer ? examState.notAnswered - 1 : examState.notAnswered
    });
  };

  const handleSaveAndNext = () => {
    if (selectedOption) {
      handleAnswer(selectedOption);
    } else if (examState.questionStatus[currentQuestionIndex] !== 'answered') {
      updateExamState({
        questionStatus: { ...examState.questionStatus, [currentQuestionIndex]: 'visited' }
      });
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      updateExamState({
        notVisited: Math.max(examState.notVisited - 1, 0)
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleMarkForReview = () => {
    updateExamState({
      markedForReview: examState.markedForReview + 1,
      questionStatus: { ...examState.questionStatus, [currentQuestionIndex]: 'review' }
    });
  };

  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to submit the exam?")) {
      setSubmitting(true);
      try {
        const token = localStorage.getItem('token');
        const payload = decodeToken(token);

        const response = await fetch(`http://localhost:3000/api/exams/${examId}/result`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ answers: examState.userAnswers, userId: payload.id }),
        });

        const result = await response.json();
        console.log('Exam submitted successfully:', result);
        localStorage.removeItem(`exam_${examId}_state`);
        navigate(`/exam/${examId}/result`, { state: { result } });
      } catch (error) {
        console.error('Error submitting exam:', error);
        alert('Failed to submit exam. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="mb-10">
      {/* Timer Display */}
      <div className="bg-gray-100 p-2 text-right font-bold text-lg">
        Time Left: {formatTime(timeLeft)}
      </div>

      <div className="bg-orange-400 text-white p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="bg-white text-orange-400 px-4 py-1">{exam.name}</button>
        </div>
      </div>

      <div className="mt-4 flex justify-between px-4">
        <div className="w-3/4 pr-4">
          <div className="border p-4">
            <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}:</h2>
            <p className="mb-4">{currentQuestion.question}</p>
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-2 border rounded ${selectedOption === option ? 'bg-green-200' : ''
                    }`}
                >
                  {option}. {currentQuestion[`option_${option.toLowerCase()}`]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSaveAndNext} className="bg-green-500 text-white px-4 py-2">SAVE & NEXT</button>
            <button onClick={handleMarkForReview} className="bg-orange-400 text-white px-4 py-2">SAVE & MARK FOR REVIEW</button>
            <button onClick={() => setSelectedOption(null)} className="bg-gray-300 text-black px-4 py-2">CLEAR RESPONSE</button>
            <button onClick={handleMarkForReview} className="bg-blue-500 text-white px-4 py-2">MARK FOR REVIEW & NEXT</button>
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={handlePrevious} className="bg-gray-300 text-black px-4 py-2">&lt;&lt; BACK</button>
            <button onClick={handleNext} className="bg-gray-300 text-black px-4 py-2">NEXT &gt;&gt;</button>
          </div>
          <button onClick={handleSubmit} className="mt-4 bg-red-500 text-white px-4 py-2 w-full">SUBMIT EXAM</button>
        </div>
        <div className="">
          <div className="bg-gray-100 p-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-300 p-2">{examState.notVisited} Not Visited</div>
              <div className="bg-red-500 text-white p-2">{examState.notAnswered} Not Answered</div>
              <div className="bg-green-500 text-white p-2">{examState.answered} Answered</div>
              <div className="bg-purple-500 text-white p-2">{examState.markedForReview} Marked for Review</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {questions.map((_, i) => {
              let bgColor = 'bg-gray-300'; // Not visited
              if (examState.questionStatus[i] === 'answered') bgColor = 'bg-green-500';
              else if (examState.questionStatus[i] === 'visited') bgColor = 'bg-red-500';
              else if (examState.questionStatus[i] === 'review') bgColor = 'bg-purple-500';

              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={`p-2 text-center ${i === currentQuestionIndex ? 'bg-orange-400 text-white' : bgColor}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {submitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p>Calculating result...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionInterface;
