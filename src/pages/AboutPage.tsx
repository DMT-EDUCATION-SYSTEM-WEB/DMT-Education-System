import React from 'react';
import { AboutSection } from '../components/sections';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="DMT Education - Giới thiệu"
        description="Tìm hiểu về DMT Education - Hệ thống giáo dục hàng đầu Việt Nam"
        keywords="DMT Education, giới thiệu, về chúng tôi, giáo dục"
      />
      
      <Layout>
        <AboutSection />
      </Layout>
    </>
  );
};

export default AboutPage;
