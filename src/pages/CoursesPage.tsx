import React from 'react';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import ModernCoursesPage from '../components/courses/ModernCoursesPage';

const CoursesPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="DMT Education - Khóa học đa dạng chất lượng cao"
        description="Khám phá hơn 50+ khóa học chất lượng từ lập trình, ngoại ngữ đến kinh doanh. Giảng viên chuyên nghiệp, phương pháp hiện đại, cam kết đầu ra."
        keywords="DMT Education, khóa học, lập trình web, UI/UX, tiếng Anh, toán học, kinh doanh, Python, học trực tuyến"
      />
      
      <Layout>
        <ModernCoursesPage />
      </Layout>
    </>
  );
};

export default CoursesPage;
