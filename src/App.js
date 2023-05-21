import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TopNavBar from './TopNavBar';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ChatPage from './ChatPage';
import TopicPage from './TopicPage';
import { TopicProvider } from './TopicContext';
import { PHILOSOPHY_TEXT } from './constants';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      <TopNavBar />
      <AnimatePresence exitBeforeEnter={false} mode="out-in">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage editMessage={PHILOSOPHY_TEXT} />} />
          <Route path="/chat/*" element={<ChatPage />} />
          <Route path="/topics" element={<TopicProvider><TopicPage /></TopicProvider>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
