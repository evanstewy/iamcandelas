
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BioPage from './pages/BioPage';
import VHSPage from './pages/VHSPage';
import LinksPage from './pages/LinksPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper to conditionally show/hide global elements
const AppContent = () => {
  const location = useLocation();
  // Pages that function as standalone landing pages (no standard navbar/footer)
  const isLandingPage = ['/vhs', '/links'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isLandingPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<BioPage />} />
          <Route path="/vhs" element={<VHSPage />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
