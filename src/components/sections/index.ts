// Section Components Exports - Only actively used components
export { default as HeaderComponent } from './HeaderComponent';
export { default as AnnouncementBanner } from './AnnouncementBanner';
export { default as Hero } from './Hero_New';
export { default as Footer } from './Footer';

// Main page sections
export { default as AboutSection } from './AboutSection';
export { default as CoursesSection } from './CoursesSection';
export { default as TeacherReviewsSection } from './TeacherReviewsSection';
export { default as ScheduleSection } from './ScheduleSection';
export { default as NewsSection } from './NewsSection';
export { default as AchievementsSection } from './AchievementsSection';
export { default as ContactSection } from './ContactSection';
export { default as ProgramsSection } from './ProgramsSection';

// Temporarily disabled - not used
// export { default as SponsorsSection } from './SponsorsSection';

// Note: These files exist but are duplicates/alternatives to the ones being used:
// - HeroSection.tsx (duplicate of Hero.tsx - Hero.tsx is used)
// - HeaderSection.tsx (duplicate of HeaderComponent.tsx - HeaderComponent.tsx is used)
// - FooterSection.tsx (duplicate of Footer.tsx - Footer.tsx is used)
// Consider removing duplicate files to avoid confusion
