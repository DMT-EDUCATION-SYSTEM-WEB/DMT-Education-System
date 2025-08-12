// This file exports common components used throughout the application. 
// You can add your common components here as needed.

// Core components that are actually used
export { Icons } from './Icons';
export { default as Loader } from './Spinner';
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Modal } from './Modal';

// Optimized components for better performance
export { 
  ErrorBoundary, 
  SuspenseWrapper, 
  LazyImage, 
  usePerformanceMonitor, 
  SEOHead 
} from './OptimizedComponents';

// Background section components for dynamic backgrounds
export { 
  BackgroundSection, 
  GradientBackground, 
  SECTION_BACKGROUNDS 
} from './BackgroundSection';

// Remove unused exports:
// - Notification (not used)
// - OptimizedCard (only used in backup files)
// - LoadingSpinner (Spinner is used instead)
// - ErrorBoundary (not used)
// - SuspenseWrapper (not used)
// - LazyImage (not used)
// - PerformanceMonitor (not used)
// - AnimatedCard (not used)
// - ResponsiveComponents (not used)
// - SkeletonLoaders (not used)
// - SEOHead (not used)
// - ScrollComponents (not used)