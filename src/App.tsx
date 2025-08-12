import React, { useEffect } from 'react';
import { useOptimizedAnimation } from './hooks/useOptimizedAnimation';
import { COLORS, TYPOGRAPHY, ANIMATIONS } from './constants';
import { ErrorBoundary, SEOHead, usePerformanceMonitor } from './components/common';
import { 
  HeaderComponent, 
  AnnouncementBanner, 
  Hero, 
  AboutSection,
  CoursesSection,
  TeacherReviewsSection,
  ScheduleSection,
  NewsSection,
  AchievementsSection,
  ContactSection,
  Footer 
} from './components/sections';

const App = () => {
  const { logInteraction } = usePerformanceMonitor('App');
  
  // Remove AOS initialization for better performance
  useEffect(() => {
    // Removed AOS.init() for performance optimization
    logInteraction('App mounted');
  }, [logInteraction]);

  return (
    <>
      <SEOHead 
        title="DMT Education - Hệ thống quản lý giáo dục"
        description="Hệ thống quản lý giáo dục DMT - Nơi ươm mầm tri thức, phát triển tài năng"
        keywords="DMT Education, giáo dục, quản lý học sinh, khóa học, giáo viên"
      />
      
      <ErrorBoundary>
        <div style={{
          minHeight: '100vh',
          background: COLORS.backgrounds.main,
          fontFamily: TYPOGRAPHY.fontFamily.primary
        }}>
          {/* Header Component */}
          <ErrorBoundary>
            <HeaderComponent />
          </ErrorBoundary>

          {/* Announcement Banner Component */}
          <ErrorBoundary>
            <AnnouncementBanner />
          </ErrorBoundary>

          {/* Hero Section Component */}
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>

          {/* About Section */}
          <ErrorBoundary>
            <AboutSection />
          </ErrorBoundary>

          {/* Courses Section */}
          <ErrorBoundary>
            <CoursesSection />
          </ErrorBoundary>

          {/* Teacher Reviews Section */}
          <ErrorBoundary>
            <TeacherReviewsSection />
          </ErrorBoundary>

          {/* Schedule Section */}
          <ErrorBoundary>
            <ScheduleSection />
          </ErrorBoundary>

          {/* Achievements Section */}
          <ErrorBoundary>
            <AchievementsSection />
          </ErrorBoundary>

          {/* News Section */}
          <ErrorBoundary>
            <NewsSection />
          </ErrorBoundary>

          {/* Contact Section */}
          <ErrorBoundary>
            <ContactSection />
          </ErrorBoundary>

          {/* Footer Component */}
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default App;
