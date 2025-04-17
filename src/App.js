// import React, { useState, useEffect } from 'react';
// import './App.css';
// import './i18n';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Nav from './components/Navbar/Nav';
// import Home from './components/Pages/Home';
// import LoginSignUpForm from './components/Profile/Profile';
// import Footer from './components/Footer/Footer';
// import Contact from './components/Pages/Contact';
// import Shop from './components/Pages/Shop';
// import CartDrawer from './components/Cart/Cart';
// import SettingsDrawer from './components/SettingsDrawer/SettingsDrawer';
// import Checkout from './components/Pages/Checkout';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ScrollToTop from './components/Pages/ScrollToTop';

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [theme, setTheme] = useState('dark');
//   const [userDetails, setUserDetails] = useState({ name: "" });

//   useEffect(() => {
//     const stored = localStorage.getItem("userDetails");
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (parsed?.name) {
//           setUserDetails(parsed);
//         }
//       } catch (e) {
//         console.error("Invalid localStorage userDetails");
//       }
//     }
//   }, []);

//   const handleBuy = (item) => {
//     setCartItems((prevItems) => {
//       const existing = prevItems.find((i) => i.id === item.id);
//       if (existing) {
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       } else {
//         return [...prevItems, { ...item, quantity: 1 }];
//       }
//     });
//     setIsCartOpen(true);
//   };

//   const handleRemove = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//   };

//   const handleBuySingle = (item) => {
//     alert(`Buying ${item.name} (${item.quantity}) - ₹${item.price * item.quantity}`);
//   };

//   const handleCartClose = () => setIsCartOpen(false);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') handleCartClose();
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   useEffect(() => {
//     document.body.className = '';
//     document.body.classList.add(`theme-${theme}`);
//   }, [theme]);

//   return (
//     <Router>
//       <ScrollToTop />
//       <ToastContainer />
//       <Nav onCartClick={() => setIsCartOpen(true)} onSettingsClick={() => setIsSettingsOpen(true)} userDetails={userDetails} />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop onBuy={handleBuy} />} />
//         <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
//         <Route path="/login" element={<LoginSignUpForm setUserDetails={setUserDetails} />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>

//       <CartDrawer
//         isOpen={isCartOpen}
//         onClose={handleCartClose}
//         cartItems={cartItems}
//         onRemove={handleRemove}
//         onBuySingle={handleBuySingle}
//       />

//       <SettingsDrawer
//         isOpen={isSettingsOpen}
//         onClose={() => setIsSettingsOpen(false)}
//         theme={theme}
//         setTheme={setTheme}
//       />

//       <Footer />
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './components/context/OrderContext';  // Make sure this path is correct

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
  const [theme, setTheme] = useState('dark');
  const [userDetails, setUserDetails] = useState({ name: "" });

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCartClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <OrderProvider>

    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Nav onCartClick={() => setIsCartOpen(true)} onSettingsClick={() => setIsSettingsOpen(true)} userDetails={userDetails} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onBuy={handleBuy} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/login" element={<LoginSignUpForm setUserDetails={setUserDetails} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders"  element={<Orders />} />
        <Route path="/about"  element={<About />} />

      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCartClose}
        cartItems={cartItems}
        onRemove={handleRemove}
        onBuySingle={handleBuySingle}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
      />

      <ScrollCircle /> {/* ✅ Scroll Indicator */}
      <Footer />
    </Router>
    </OrderProvider>

  );
}

export default App;

