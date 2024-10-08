import React, { createContext, useState, useEffect, useContext } from 'react';

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
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

    return (
        <ExamContext.Provider value={{ exam, questions }}>
            {children}
        </ExamContext.Provider>
    );
};

export const useExam = () => {
    return useContext(ExamContext);
};
