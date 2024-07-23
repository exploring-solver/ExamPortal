import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/Auth/AuthContext';

const OrganizationDashboard = () => {
    const { isAuthenticated, user } = useAuth();
    const [organizationId, setOrganizationId] = useState(null);
    const [exams, setExams] = useState([]);
    const [newExam, setNewExam] = useState({ name: '', category_id: '', sector_id: '', exam_date: '', status: '' });

    useEffect(() => {
        if (isAuthenticated) {
            const fetchOrganizationId = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/users/organization', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setOrganizationId(response.data.organizationId);
                } catch (error) {
                    console.error('Error fetching organization ID:', error);
                }
            };

            fetchOrganizationId();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (organizationId) {
            const fetchExams = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/exams/organization/${organizationId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setExams(response.data);
                } catch (error) {
                    console.error('Error fetching exams:', error);
                }
            };

            fetchExams();
        }
    }, [organizationId]);

    const handleChange = (e) => {
        setNewExam({
            ...newExam,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/exams/`, newExam, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Refresh the exam list after creating a new exam
            const response = await axios.get(`http://localhost:3000/api/exams/organization/${organizationId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setExams(response.data);
        } catch (error) {
            console.error('Error creating exam:', error);
        }
    };

    return (
        <div className="min-h-full flex flex-col">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Your Exams</h1>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Create New Exam</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={newExam.name}
                            onChange={handleChange}
                            placeholder="Exam Name"
                            className="block w-full border rounded px-4 py-2"
                        />
                        <input
                            type="text"
                            name="category_id"
                            value={newExam.category_id}
                            onChange={handleChange}
                            placeholder="Category ID"
                            className="block w-full border rounded px-4 py-2"
                        />
                        <input
                            type="text"
                            name="sector_id"
                            value={newExam.sector_id}
                            onChange={handleChange}
                            placeholder="Sector ID"
                            className="block w-full border rounded px-4 py-2"
                        />
                        <input
                            type="date"
                            name="exam_date"
                            value={newExam.exam_date}
                            onChange={handleChange}
                            placeholder="Exam Date"
                            className="block w-full border rounded px-4 py-2"
                        />
                        <select
                            name="status"
                            value={newExam.status}
                            onChange={handleChange}
                            className="block w-full border rounded px-4 py-2"
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="previous">Previous</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Create Exam
                        </button>
                    </form>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Existing Exams</h2>
                    <ul>
                        {exams.map(exam => (
                            <li key={exam.id} className="border-b py-2">
                                <h3 className="text-lg font-medium">{exam.name}</h3>
                                <p>Category ID: {exam.category_id}</p>
                                <p>Sector ID: {exam.sector_id}</p>
                                <p>Date: {exam.exam_date}</p>
                                <p>Status: {exam.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDashboard;
