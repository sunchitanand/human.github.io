import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TopNavBar from './TopNavBar';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

const editMessage = `
In 1970, Xerox PARC planted the seed for a revolution with the invention of the mouse. This birthed the era of the graphical user interface, shaping the way we interact with computers through windows, icons, menus, and pointers. A paradigm shift that moved us from command lines to graphical interfaces.\n\n

But now, we stand on the brink of yet another monumental shift. This time, the transition is from graphical user interfaces to language user interfaces, from clicks and cursors to natural language conversations. We are entering an era where our digital interactions are shaped by the fluidity of conversation, not rigid structures.\n\n

Artificial Intelligence is not just a tool anymore; it's evolving into an interactive companion that understands us. A world where knowledge isn't locked away in databases but is accessible to all, presented in an interactive, friendly manner through simple conversations with an AI.\n\n

At Human+, we recognize and embrace this transformative shift. We are committed to leading the revolution in user interface design, stepping away from the traditional constraints of GUI to create more intuitive, interactive AI interfaces. Our mission is to build the dashboard for the powerful engine of AI, an interface that mirrors the power and intuitiveness of human language, making interactions with AI as natural as talking to a friend.\n\n

In the realm of Large Language Models, companies like OpenAI have laid the groundwork, creating a formidable AI infrastructure. But the bridge between humans and this powerful AI, the interface, is a wide-open field of opportunity. At Human+, our focus is on building this bridge.\n\n

Our first product, an AI chatbot, exemplifies this mission. It's designed to transform research into an engaging conversation, threading knowledge like a knowledge graph. But this is more than just about building a product; it's about reshaping our interaction with the digital world. It's about crafting an interface so powerful and intuitive that we would prefer using it over existing ones.\n\n

We envision a world where every individual has a personal AI - a companion that assists them in dreaming, creating, learning, solving, planning, and achieving more than ever before. We aren't just revolutionizing the user experience of traditional apps with LLMs, we are redefining the very relationship humans have with technology.\n\n

The opportunity before us is incredible. Together, we can build something extraordinary, something that enhances human capabilities, something that truly ushers in the new era of AI.
`;

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
      <AnimatePresence exitBeforeEnter={false} mode='out-in'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage editMessage={editMessage} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;