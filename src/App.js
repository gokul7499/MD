import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav from './components/Navbar/Nav';
import Home from './components/Pages/Home'
import LoginSignUpForm from './components/Profile/Profile'
import Footer from './components/Footer/Footer';
function App() {
  return (
    <Router>
     <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignUpForm />} />
      </Routes>
      <Footer/>
    </Router>
  );

}

export default App;
