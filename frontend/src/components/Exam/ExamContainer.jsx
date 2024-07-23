import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ExamGuidelines from './ExamGuidelines';
import QuestionInterface from './QuestionInterface';

const ExamContainer = () => {
    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const examResponse = await fetch(`http://localhost:3000/api/exams/${examId}`);
                const examData = await examResponse.json();
                setExam(examData);

                const questionsResponse = await fetch(`http://localhost:3000/api/exams/getall/${examId}`);
                const questionsData = await questionsResponse.json();
                setQuestions(questionsData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching exam data:', error);
                setLoading(false);
            }
        };

        fetchExamData();
    }, [examId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ExamGuidelines exam={exam} />
        </div>
    );
};

export default ExamContainer;