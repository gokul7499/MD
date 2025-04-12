import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import Nav from './components/Navbar/Nav';
import Home from './components/Pages/Home';
import LoginSignUpForm from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Contact from './components/Pages/Contact';
import Shop from './components/Pages/Shop';
import CartDrawer from './components/Cart/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
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

  // Close cart and clear items
  const handleCartClose = () => {
    setIsCartOpen(false);
    setCartItems([]);
  };

  // Handle Escape key to close and clear cart
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCartClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <Nav onCartClick={() => setIsCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onBuy={handleBuy} />} />
        <Route path="/login" element={<LoginSignUpForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCartClose}
        cartItems={cartItems}
      />
      <Footer />
    </Router>
  );
}

export default App;
