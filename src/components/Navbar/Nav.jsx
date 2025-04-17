import React, { useState, useEffect } from 'react';
import { FaUser, FaBars, FaTimes, FaCog } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import CartDrawer from '../Cart/Cart';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../context/OrderContext';

const Nav = ({ userDetails: propUserDetails, onCartClick }) => {
  const [location, setLocation] = useState('delhi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const { orderCount } = useOrders();


  // Get userDetails from props or localStorage
  const storedUser = localStorage.getItem("userDetails");
  const parsedUser = storedUser ? JSON.parse(storedUser) : {};
  const userDetails = propUserDetails || parsedUser;

  const getUserInitial = (name) => {
    return name ? name.trim().charAt(0).toUpperCase() : "G";
  };

  const initial = getUserInitial(userDetails?.name);

  // Placeholder animation logic
  const placeholders = [
    ' Search for products',
    ' Search for brands',
    ' Search for categories',
    ' Search for AC fitting',
    ' Search for services',
    ' Search local experts',
    ' Search for building materials',
    ' Search electricians',
    ' Search construction tools',
    ' Search plumbing services',
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("userDetails");
    if (stored && !userDetails?.name) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          userDetails.name = parsed.name;
        }
      } catch (e) {
        console.error("Invalid localStorage userDetails");
      }
    }
  }, []);
  
  useEffect(() => {
    let currentText = placeholders[placeholderIndex];
    let charIndex = 0;
    setDisplayText('');
    
    const typeInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setDisplayText((prev) => prev + currentText[charIndex]);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTyping(false);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          setTyping(true);
        }, 1000);
      }
    }, 100);
  
    return () => clearInterval(typeInterval);
  }, [placeholderIndex, typing]);
  
  // Scroll to top when Home is clicked while already on home page
  const handleHomeClick = (e) => {
    if (currentPath === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleAboutClick = (e) => {
    if (currentPath === '/about') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleShopClick = (e) => {
    if (currentPath === '/shop') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleContactClick = (e) => {
    if (currentPath === '/contact') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  



  // Logout popup handlers
  const handleUserIconClick = () => {
    setShowLogoutPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setShowLogoutPopup(false);
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300">
        <nav className="flex items-center justify-between px-4 py-3 md:px-8 ml-5">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-800 ml-3"
            onClick={handleHomeClick}
          >
            MD Developer
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 text-base font-medium">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-black"
              onClick={handleHomeClick}
            >
              {t('home')}
            </Link>
            <Link onClick={handleShopClick} to="/shop" className="text-gray-600 hover:text-black">{t('shop')}</Link>
            <Link onClick={handleContactClick} to="/contact" className="text-gray-600 hover:text-black">{t('contacts')}</Link>
            {/* <Link onClick={handleAboutClick} to="/about" className="text-gray-600 hover:text-black">{t('about')}</Link> */}

          </div>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
            >
              <option value="delhi">{t('location_options.delhi')}</option>
              <option value="cp">{t('location_options.cp')}</option>
              <option value="mumbai">{t('location_options.mumbai')}</option>
              <option value="pune">{t('location_options.pune')}</option>
            </select>

            <input
              type="text"
              placeholder={displayText || t('location')}
              className="border border-gray-300 rounded-md px-3 py-2 md:w-64 text-gray-700"
            />

            <button onClick={onCartClick} className="relative text-gray-700 hover:text-black">
              <ShoppingCart size={24} />
            </button>

            <div
              onClick={handleUserIconClick}
              className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-semibold cursor-pointer"
            >
              {initial}
            </div>

            <button onClick={() => setIsSettingsDrawerOpen(true)} className="text-xl text-gray-700 hover:text-black">
              <FaCog />
            </button>
            <Link to="/orders" className="relative p-2 text-gray-700 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {orderCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {orderCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 text-xl">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-3 bg-white shadow-md flex flex-col items-center">
            {['home', 'shop', 'contact'].map((route) => (
              <Link
                key={route}
                to={`/${route === 'home' ? '' : route}`}
                onClick={(e) => {
                  if (route === 'home' && currentPath === '/') {
                    e.preventDefault();
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 text-gray-600 hover:text-black"
              >
                {t(route)}
              </Link>
            ))}

            <button
              onClick={() => {
                setIsSettingsDrawerOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="py-2 text-gray-600 hover:text-black flex items-center gap-2"
            >
              <FaCog /> {t('settings')}
            </button>

            <div className="flex space-x-4 mt-4">
              <button onClick={() => setIsCartOpen(true)} className="text-gray-700 hover:text-black">
                <ShoppingCart size={24} />
              </button>
              <button onClick={handleUserIconClick}>
                <FaUser className="text-xl text-gray-700 hover:text-black" />
              </button>
              <div
                onClick={handleUserIconClick}
                className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-semibold cursor-pointer"
              >
                {initial}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="absolute top-16 right-4 bg-white shadow-xl rounded-md border p-4 w-48 z-50">
          <p className="text-sm mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-between">
            <button
              onClick={handleLogout}
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
            >
              Logout
            </button>
            <button
              onClick={handleCancelLogout}
              className="text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      )}

      {/* Settings Drawer */}
      <SettingsDrawer isOpen={isSettingsDrawerOpen} onClose={() => setIsSettingsDrawerOpen(false)} />
    </>
  );
};

export default Nav;