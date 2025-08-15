import React, { useEffect, useState } from 'react';
import { fetchCourses, CourseCardData } from '../api'; // Adjust the import based on your API structure
import CourseCard from '../components/CourseCard'; // Assuming you have a CourseCard component for displaying individual courses
import Loader from '../../../components/common/Loader'; // Assuming you have a Loader component for loading state
import ErrorMessage from '../../../components/common/ErrorMessage'; // Assuming you have an ErrorMessage component for error handling

const Catalog = () => {
    const [courses, setCourses] = useState<CourseCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách khóa học');
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="catalog">
            <h1 className="text-2xl font-bold mb-4">Course Catalog</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default Catalog;