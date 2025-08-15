import React from 'react';
import { HeaderComponent, Footer } from '../sections';
import { ErrorBoundary } from '../common';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh' }}>
        <HeaderComponent />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
