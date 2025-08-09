import React from 'react';
import { useEffect, useState } from 'react';
import { fetchReports } from '../../../services/http'; // Adjust the import based on your API service structure
import { ReportTable } from '../../../components/tables'; // Assuming you have a table component for displaying reports

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const data = await fetchReports(); // Fetch reports from the API
                setReports(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="reports-container">
            <h1>Reports</h1>
            <ReportTable data={reports} /> {/* Render the report data in a table */}
        </div>
    );
};

export default Reports;