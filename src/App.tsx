import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplineBackground from './components/SplineBackground';
import AppRoutes from './routes';
import { initializeGA } from './utils/analytics';

// Analytics wrapper component
const AnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA when the app loads
    initializeGA();
  }, []);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AnalyticsWrapper>
        <div className="min-h-screen flex flex-col">
          <SplineBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </div>
      </AnalyticsWrapper>
    </Router>
  );
}

export default App;