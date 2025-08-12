import React, { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

export const PerformanceMonitor: React.FC = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    loadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0
  });

  useEffect(() => {
    const measurePerformance = () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (perfData) {
        metricsRef.current = {
          loadTime: perfData.loadEventEnd - perfData.loadEventStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
          firstPaint: 0,
          firstContentfulPaint: 0
        };
      }

      // Measure paint metrics
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-paint') {
          metricsRef.current.firstPaint = entry.startTime;
        } else if (entry.name === 'first-contentful-paint') {
          metricsRef.current.firstContentfulPaint = entry.startTime;
        }
      });

      // Web Vitals
      if ('PerformanceObserver' in window) {
        // LCP - Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metricsRef.current.largestContentfulPaint = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // CLS - Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          metricsRef.current.cumulativeLayoutShift = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // FID - First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstInput = entries[0];
          if (firstInput) {
            metricsRef.current.firstInputDelay = firstInput.processingStart - firstInput.startTime;
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      }

      // Log metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', metricsRef.current);
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  // Memory usage monitoring
  useEffect(() => {
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        if (process.env.NODE_ENV === 'development') {
          console.log('Memory Usage:', {
            used: Math.round(memInfo.usedJSHeapSize / 1048576) + ' MB',
            total: Math.round(memInfo.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) + ' MB'
          });
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 30000); // Check every 30s
    return () => clearInterval(memoryInterval);
  }, []);

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}
    >
      Performance Monitor Active
    </div>
  );
};
