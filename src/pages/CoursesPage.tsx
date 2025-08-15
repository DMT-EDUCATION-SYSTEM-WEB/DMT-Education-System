import React from 'react';
import { CoursesSection } from '../components/sections';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';

const CoursesPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="DMT Education - Khóa học"
        description="Danh sách các khóa học tại DMT Education"
        keywords="DMT Education, khóa học, chương trình học, giáo dục"
      />
      
      <Layout>
        <CoursesSection />
      </Layout>
    </>
  );
};

export default CoursesPage;
