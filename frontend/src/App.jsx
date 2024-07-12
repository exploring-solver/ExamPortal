import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Standard/Home';
import NotFound from './components/Standard/NotFound';
import Footer from './components/Standard/Footer';
import AppNavbar from '../src/components/Standard/AppNavbar'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <AppNavbar /> */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
