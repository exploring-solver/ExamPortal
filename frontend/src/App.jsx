import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Standard/Home';
import NotFound from './components/Standard/NotFound';
import Footer from './components/Standard/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;