import React, { useState, useEffect } from 'react';
import './App.css';
import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './components/context/OrderContext';

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
import CustomCursor from './components/Pages/CustomCursor';

import { useTheme } from './ThemeContext'; // ✅ Theme context hook

function App() {
  const { theme } = useTheme(); // ✅ Get theme from context

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "" });

  // Load user details from localStorage
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

  const handleBuy = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleRemove = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleBuySingle = (item) => {
    alert(`Buying ${item.name} (${item.quantity}) - ₹${item.price * item.quantity}`);
  };

  const handleCartClose = () => setIsCartOpen(false);

  // Close cart drawer when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCartClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <OrderProvider>
      <Router>
        <CustomCursor />
        <ScrollToTop />
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme === 'light' ? 'light' : 'dark'}
        />

        <Nav 
          onCartClick={() => setIsCartOpen(true)} 
          onSettingsClick={() => setIsSettingsOpen(true)} 
          userDetails={userDetails} 
          theme={theme}
        />

        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/shop" element={<Shop onBuy={handleBuy} theme={theme} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} theme={theme} />} />
          <Route path="/login" element={<LoginSignUpForm setUserDetails={setUserDetails} theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="/orders" element={<Orders theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
        </Routes>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={handleCartClose}
          cartItems={cartItems}
          onRemove={handleRemove}
          onBuySingle={handleBuySingle}
          theme={theme}
        />

        <SettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          theme={theme}
          setTheme={() => {}} // optional, as theme is now managed by context
        />

        <ScrollCircle />
        <Footer theme={theme} />
      </Router>
    </OrderProvider>
  );
}

export default App;
