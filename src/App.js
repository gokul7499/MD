import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./i18n"
import Nav from './components/Navbar/Nav';
import Home from './components/Pages/Home'
import LoginSignUpForm from './components/Profile/Profile'
import Footer from './components/Footer/Footer';
import Contact from './components/Pages/Contact';
function App() {
  return (
    <Router>
     <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignUpForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
  );

}

export default App;
