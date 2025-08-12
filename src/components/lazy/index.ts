import { lazy } from 'react';

// IMPORTANT: These lazy-loaded components are currently NOT USED
// The main App.tsx directly imports and renders sections instead of using lazy loading
// Consider implementing lazy loading for better performance in the future

// Lazy load all major sections for optimal performance (UNUSED)
export const LazyHeroSection = lazy(() => import('../sections/HeroSection'));
export const LazyAboutSection = lazy(() => import('../sections/AboutSection'));
export const LazyCoursesSection = lazy(() => import('../sections/CoursesSection'));
export const LazyTeachersSection = lazy(() => import('../sections/TeachersSection'));
export const LazyAchievementsSection = lazy(() => import('../sections/AchievementsSection'));
export const LazyNewsSection = lazy(() => import('../sections/NewsSection'));
export const LazyScheduleSection = lazy(() => import('../sections/ScheduleSection'));
export const LazySponsorsSection = lazy(() => import('../sections/SponsorsSection'));
export const LazyContactSection = lazy(() => import('../sections/ContactSection'));
export const LazyFooterSection = lazy(() => import('../sections/FooterSection'));

// Non-lazy components (always loaded) - UNUSED
export { default as HeaderSection } from '../sections/HeaderSection';

// TODO: To implement lazy loading, replace imports in App.tsx with:
// import { Suspense } from 'react';
// import { LazyAboutSection, LazyCoursesSection, etc. } from './components/lazy';
// 
// Then wrap each component:
// <Suspense fallback={<LoadingSpinner />}>
//   <LazyAboutSection />
// </Suspense>
