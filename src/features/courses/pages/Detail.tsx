import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetail } from '../../api';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../components/common/ErrorMessage';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const data = await getCourseDetail(courseId);
                setCourse(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetail();
    }, [courseId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="course-detail">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="mt-4">{course.description}</p>
            <h2 className="mt-6 text-xl">Instructor: {course.instructor}</h2>
            <h3 className="mt-4">Duration: {course.duration} hours</h3>
            <h3 className="mt-4">Price: ${course.price}</h3>
            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">
                Enroll Now
            </button>
        </div>
    );
};

export default CourseDetail;