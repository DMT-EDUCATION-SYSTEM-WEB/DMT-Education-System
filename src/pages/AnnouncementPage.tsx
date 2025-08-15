import React from 'react';
import { AnnouncementBanner, NewsSection } from '../components/sections';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';

const AnnouncementPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="DMT Education - Thông báo"
        description="Thông báo và tin tức mới nhất từ DMT Education"
        keywords="DMT Education, thông báo, tin tức, hoạt động"
      />
      
      <Layout>
        <AnnouncementBanner />
        <NewsSection />
      </Layout>
    </>
  );
};

export default AnnouncementPage;
