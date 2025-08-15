import React from 'react';
import { 
  AnnouncementBanner, 
  Hero, 
  AchievementsSection,
  ContactSection
} from '../components/sections';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="DMT Education - Trang chủ"
        description="Trang chủ DMT Education - Hệ thống quản lý giáo dục"
        keywords="DMT Education, trang chủ, giáo dục, khóa học"
      />
      
      <Layout>
        <AnnouncementBanner />
        <Hero />
        <AchievementsSection />
        <ContactSection />
      </Layout>
    </>
  );
};

export default HomePage;
