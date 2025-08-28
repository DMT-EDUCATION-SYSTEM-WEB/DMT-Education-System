import React from 'react';
import {
  AnnouncementBanner,
  Hero,
  AboutSection,
  AchievementsSection,
  ProgramsSection,
  ContactSection,
} from '../components/sections';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="DMT Education - Trang chủ"
        description="DMT Education - Hệ thống quản lý giáo dục hàng đầu. Tìm hiểu về chúng tôi và các khóa học chất lượng cao."
        keywords="DMT Education, trang chủ, giáo dục, khóa học, về chúng tôi, giới thiệu"
      />

      <Layout>
        <AnnouncementBanner />
        <Hero />
        <AboutSection />
        <ProgramsSection />
        <AchievementsSection />
        <ContactSection />
      </Layout>
    </>
  );
};

export default HomePage;
