import React from 'react';
import { ScheduleSection } from '../components/sections';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';

const SchedulePage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="DMT Education - Lịch khai giảng"
        description="Lịch khai giảng các khóa học tại DMT Education"
        keywords="DMT Education, lịch khai giảng, thời khóa biểu, lịch học"
      />
      
      <Layout>
        <ScheduleSection />
      </Layout>
    </>
  );
};

export default SchedulePage;
