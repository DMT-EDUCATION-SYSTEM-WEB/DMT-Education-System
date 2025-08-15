import React from 'react';
import { TeacherReviewsSection } from '../components/sections';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';

const TeachersPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="DMT Education - Đội ngũ giảng viên"
        description="Đội ngũ giảng viên giàu kinh nghiệm tại DMT Education"
        keywords="DMT Education, giảng viên, giáo viên, đội ngũ"
      />
      
      <Layout>
        <TeacherReviewsSection />
      </Layout>
    </>
  );
};

export default TeachersPage;
