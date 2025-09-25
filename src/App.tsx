import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import About from './screens/About';
import Countries from './screens/Countries';
import Symbols from './screens/Symbols';
import Login from './screens/Login';
import Register from './screens/Register';
import Test from './screens/Test';
import Header from './components/Header';
import Footer from './components/Footer';


const App: React.FC = () => {

  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/symbols" element={<Symbols />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <Footer />
    </Router>
  );
};

export default App;