import React, { useEffect, useState } from 'react';
import { fetchSurveys } from '../api';
import { Survey } from '../types';

const SurveyList: React.FC = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSurveys = async () => {
            try {
                const data = await fetchSurveys();
                setSurveys(data);
            } catch (err) {
                setError('Failed to load surveys');
            } finally {
                setLoading(false);
            }
        };

        loadSurveys();
    }, []);

    if (loading) {
        return <div>Loading surveys...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Survey List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {surveys.map((survey) => (
                        <tr key={survey.id}>
                            <td>{survey.id}</td>
                            <td>{survey.title}</td>
                            <td>{new Date(survey.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SurveyList;