import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../../../services/http'; // Adjust the import based on your API service structure
import TaskCard from '../../../components/common/TaskCard'; // Assuming you have a TaskCard component for displaying tasks
import Loader from '../../../components/common/Loader'; // Assuming you have a Loader component for loading state
import { Task } from '../../../types'; // Assuming you have a Task type defined in your types

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetchTasks(); // Fetch tasks from the API
                setTasks(response.data); // Assuming response.data contains the tasks
            } catch (err) {
                setError('Failed to load tasks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    if (loading) {
        return <Loader />; // Show loader while fetching tasks
    }

    if (error) {
        return <div className="error">{error}</div>; // Show error message if there's an error
    }

    return (
        <div className="tasks-container">
            <h1 className="text-2xl font-bold">Staff Tasks</h1>
            <div className="task-list">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} /> // Render each task using TaskCard component
                ))}
            </div>
        </div>
    );
};

export default Tasks;