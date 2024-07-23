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
  const [answered, setAnswered] = useState(0);
  const [notAnswered, setNotAnswered] = useState(0);
  const [notVisited, setNotVisited] = useState(0);
  const [markedForReview, setMarkedForReview] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [questionStatus, setQuestionStatus] = useState({});

  const fetchExamData = useCallback(async () => {
    try {
      const examResponse = await fetch(`http://localhost:3000/api/exams/${examId}`);
      const examData = await examResponse.json();
      setExam(examData);

      const questionsResponse = await fetch(`http://localhost:3000/api/exams/getall/${examId}`);
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData);
      setNotAnswered(questionsData.length);
      setNotVisited(questionsData.length - 1);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setLoading(false);
    }
    const storedAnswers = JSON.parse(localStorage.getItem(`exam_${examId}_answers`) || '{}');
    setUserAnswers(storedAnswers);
    const storedStatus = JSON.parse(localStorage.getItem(`exam_${examId}_status`) || '{}');
    setQuestionStatus(storedStatus);
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
        } catch (error) {
          console.error('Error fetching question:', error);
        }
      }
    };

    fetchQuestion();
  }, [currentQuestionIndex, questions]);

  if (loading) {
    return <div>No questions for this exam.</div>;
  }

  const updateQuestionStatus = (index, status) => {
    setQuestionStatus(prev => {
      const newStatus = { ...prev, [index]: status };
      localStorage.setItem(`exam_${examId}_status`, JSON.stringify(newStatus));
      return newStatus;
    });
  };

  const handleAnswer = (answer) => {
    setSelectedOption(answer);
    setUserAnswers(prev => {
      const newAnswers = { ...prev, [currentQuestion.id]: answer };
      localStorage.setItem(`exam_${examId}_answers`, JSON.stringify(newAnswers));
      console.log('Answer stored:', { questionId: currentQuestion.id, answer });
      return newAnswers;
    });
    updateQuestionStatus(currentQuestionIndex, 'answered');
  };

  const handleSaveAndNext = () => {
    if (selectedOption) {
      setAnswered(prev => Math.min(prev + 1, questions.length));
      setNotAnswered(prev => Math.max(prev - 1, 0));
    } else {
      updateQuestionStatus(currentQuestionIndex, 'visited');
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setNotVisited(prev => Math.max(prev - 1, 0));
      setSelectedOption(userAnswers[questions[currentQuestionIndex + 1].question_id] || null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[questions[currentQuestionIndex - 1].question_id] || null);
    }
  };

  const handleMarkForReview = () => {
    setMarkedForReview(prev => Math.min(prev + 1, questions.length));
    updateQuestionStatus(currentQuestionIndex, 'review');
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
          body: JSON.stringify({ answers: userAnswers, userId: payload.id }),
        });

        const result = await response.json();
        console.log('Exam submitted successfully:', result);
        localStorage.removeItem(`exam_${examId}_answers`);
        localStorage.removeItem(`exam_${examId}_status`);
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
      <div className="bg-orange-400 text-white p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="bg-white text-orange-400 px-4 py-1">{exam.name}</button>
          {/* <button className="bg-blue-500 px-4 py-1">PHYSICS</button>
          <button className="bg-blue-500 px-4 py-1">CHEMISTRY</button>
          <button className="bg-blue-500 px-4 py-1">MATHEMATICS</button> */}
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
            <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}:</h2>
            <p className="mb-4">{currentQuestion.question}</p>
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-2 border rounded ${selectedOption === option ? 'bg-blue-200' : ''}`}
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
              <div className="bg-gray-300 p-2">{notVisited} Not Visited</div>
              <div className="bg-red-500 text-white p-2">{notAnswered} Not Answered</div>
              <div className="bg-green-500 text-white p-2">{answered} Answered</div>
              <div className="bg-purple-500 text-white p-2">{markedForReview} Marked for Review</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {questions.map((_, i) => {
              let bgColor = 'bg-gray-300'; // Not visited
              if (questionStatus[i] === 'answered') bgColor = 'bg-green-500';
              else if (questionStatus[i] === 'visited') bgColor = 'bg-red-500';
              else if (questionStatus[i] === 'review') bgColor = 'bg-purple-500';

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
            {/* Add a spinner here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionInterface;