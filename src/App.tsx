import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import About from './screens/About';
import Header from './components/Header';
import Footer from './components/Footer';


const App: React.FC = () => {

  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
    </Router>
  );
};

export default App;