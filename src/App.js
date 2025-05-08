import React, { useState, useEffect } from 'react';
import './App.css';
import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './components/context/OrderContext';
  // Import ThemeProvider

import Nav from './components/Navbar/Nav';
import Home from './components/Pages/Home';
import LoginSignUpForm from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Contact from './components/Pages/Contact';
import Shop from './components/Pages/Shop';
import CartDrawer from './components/Cart/Cart';
import SettingsDrawer from './components/SettingsDrawer/SettingsDrawer';
import Checkout from './components/Pages/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/Pages/ScrollToTop';
import ScrollCircle from './components/Pages/ScrollCircle';
import Orders from './components/Orders/Orders';
import About from './components/Pages/Aboutus';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "" });

  // Fetch user details from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userDetails");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          setUserDetails(parsed);
        }
      } catch (e) {
        console.error("Invalid localStorage userDetails");
      }
    }
  }, []);

    // Access the current theme

  return (
    <div className={`min-h-screen `}> {/* Apply theme class globally */}
      <OrderProvider>
        <Router>
          <ScrollToTop />
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />

          <Nav
            onCartClick={() => setIsCartOpen(true)}
            onSettingsClick={() => setIsSettingsOpen(true)}
            userDetails={userDetails}
            // Pass theme toggle function to Nav
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginSignUpForm setUserDetails={setUserDetails} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<About />} />
          </Routes>

          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
          <ScrollCircle />
          <Footer />
        </Router>
      </OrderProvider>
    </div>
  );
}

export default App;