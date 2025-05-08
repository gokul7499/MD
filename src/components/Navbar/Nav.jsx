import React, { useState, useEffect } from 'react';
import { FaUser, FaBars, FaTimes, FaCog, FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import CartDrawer from '../Cart/Cart';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../context/OrderContext';
// import { useTheme } from "../ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import AboutUsPage from '../Pages/Aboutus';

const Nav = ({ userDetails: propUserDetails, onSettingsClick }) => {
  const [location, setLocation] = useState('delhi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
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

  const placeholders = [
      '  Search for products',
      '  Search for brands',
      '  Search for categories',
      '  Search for AC fitting',
      '  Search for services',
      '  Search local experts',
      '  Search for building materials',
      '  Search electricians',
      '  Search construction tools',
      '  Search plumbing services', 
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
  
  // Scroll to top when clicking nav links
  const handleNavClick = (path) => (e) => {
    if (currentPath === path) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full shadow-md z-50 bg-white`}>
        <div className="container mx-auto px-4">
          {/* Top Bar - Logo and Mobile Controls */}
          <div className="flex items-center justify-between py-3">
            {/* Logo/Brand */}
            <Link 
              to="/" 
              className="text-xl md:text-2xl font-bold flex items-center"
              onClick={handleNavClick('/')}
            >
              <span className=" ">
                <img src='img/mdlogo.png' className="w-12 h-auto" />  
                {/* w-12 = width: 3rem (48px), h-auto = height adjusts proportionally */}
              </span>
              <span className="hidden sm:inline">Developer</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Navigation Links */}
              <div className="flex space-x-6 text-base font-medium">
                <Link 
                  to="/" 
                  className={`hover:text-pink-600 px-2 py-1 transition-colors duration-200 `}
                  onClick={handleNavClick('/')}
                >
                  {t('home')}
                </Link>
                <Link 
                  to="/shop" 
                  className={`hover:text-pink-600 px-2 py-1 transition-colors duration-200 `}
                  onClick={handleNavClick('/shop')}
                >
                  {t('shop')}
                </Link>
                <Link 
                  to="/about" 
                  className={`hover:text-pink-600 px-2 py-1 transition-colors duration-200 `}
                  onClick={handleNavClick('/about')}
                >
                  {t('aboutus')}
                </Link>
                <Link 
                  to="/contact" 
                  className={`hover:text-pink-600 px-2 py-1 transition-colors duration-200`}
                  onClick={handleNavClick('/contact')}
                >
                  {t('contacts')}
                </Link>
              </div>

              {/* Search and Location */}
              <div className="flex items-center space-x-2 ml-4">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 `}
                >
                  <option value="delhi">{t('location_options.delhi')}</option>
                  <option value="cp">{t('location_options.cp')}</option>
                  <option value="mumbai">{t('location_options.mumbai')}</option>
                  <option value="pune">{t('location_options.pune')}</option>
                </select>

                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={displayText}
                    className={`border rounded-md pl-3 pr-8 py-1 w-48 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  <button 
                    type="submit" 
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2  hover:text-pink-600`}
                  >
                    <FaSearch size={14} />
                  </button>
                </form>
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-4 ml-4">
                <button 
                  onClick={handleCartClick}
                  className={`relative p-1 transition-colors duration-200 `}
                >
                  <ShoppingCart size={20} />
                  {orderCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {orderCount}
                    </span>
                  )}
                </button>

                <Link 
                  to="/orders" 
                  className={`relative p-1 transition-colors duration-200 `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </Link>

                <button 
                  onClick={() => setIsSettingsDrawerOpen(true)} 
                  className={`p-1 transition-colors duration-200 `}
                >
                  <FaCog className="text-lg" />
                </button>

                <div className="relative">
                  <div
                    onClick={handleUserIconClick}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  >
                    {initial}
                  </div>
                  {showLogoutPopup && (
                    <div className={`absolute top-10 right-0 shadow-xl rounded-md border p-3 w-48 z-50 `}>
                      <p className={`text-sm mb-3`}>Are you sure you want to logout?</p>
                      <div className="flex justify-between space-x-2">
                        <button
                          onClick={handleLogout}
                          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 text-sm rounded hover:opacity-90 transition-opacity duration-200 flex-1"
                        >
                          Logout
                        </button>
                        <button
                          onClick={handleCancelLogout}
                          className={`px-3 py-1 text-sm rounded transition-colors duration-200 flex-1`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className={`p-1 `}
              >
                <FaSearch size={18} />
              </button>
              
              <button 
                onClick={handleCartClick}
                className={`relative p-1 `}
              >
                <ShoppingCart size={20} />
                {orderCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {orderCount}
                  </span>
                )}
              </button>
              
              {/* Hamburger Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Mobile Search */}
          {isSearchExpanded && (
            <div className="lg:hidden mb-3 transition-all duration-300 ease-in-out">
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={displayText}
                  className={`border rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-pink-500 `}
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden shadow-lg animate-slideDown `}>
            <div className="container mx-auto px-4 py-2">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-1 py-2">
                <Link
                  to="/"
                  onClick={handleNavClick('/')}
                  className={`py-3 px-4 rounded-lg transition-colors duration-200 flex items-center 
                  `}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 
                 `}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  {t('home')}
                </Link>
                <Link
                  to="/shop"
                  onClick={handleNavClick('/shop')}
                  className={`py-3 px-4 rounded-lg transition-colors duration-200 flex items-center `}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </span>
                  {t('shop')}
                </Link>
                <Link
                  to="/about"
                  onClick={handleNavClick('/about')}
                  className={`py-3 px-4 rounded-lg transition-colors duration-200 flex items-center `}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 `}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  {t('aboutus')}
                </Link>
                <Link
                  to="/contact"
                  onClick={handleNavClick('/contact')}
                  className={`py-3 px-4 rounded-lg transition-colors duration-200 flex items-center 
               `}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 `}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  {t('contacts')}
                </Link>
              </div>

              {/* Theme Toggle in Mobile Menu */}
             

              {/* Mobile Location Selector */}
              <div className={`py-3 px-4 border-t `}>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 `}
                >
                  <option value="delhi">{t('location_options.delhi')}</option>
                  <option value="cp">{t('location_options.cp')}</option>
                  <option value="mumbai">{t('location_options.mumbai')}</option>
                  <option value="pune">{t('location_options.pune')}</option>
                </select>
              </div>

              {/* Mobile Bottom Actions */}
              <div className={`flex items-center justify-between py-3 px-4 border-t `}>
                <button
                  onClick={() => {
                    setIsSettingsDrawerOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center p-2 transition-colors duration-200 `}
                >
                  <FaCog className="mr-2" />
                  <span>{t('settings')}</span>
                </button>

                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center p-2 transition-colors duration-200 `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Orders</span>
                </Link>

                <div className="relative">
                  <div
                    onClick={handleUserIconClick}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  >
                    {initial}
                  </div>
                  {showLogoutPopup && (
                    <div className={`absolute bottom-12 right-0 shadow-xl rounded-md border p-3 w-48 z-50 `}>
                      <p className={`text-sm mb-3 `}>Are you sure you want to logout?</p>
                      <div className="flex justify-between space-x-2">
                        <button
                          onClick={handleLogout}
                          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 text-sm rounded hover:opacity-90 transition-opacity duration-200 flex-1"
                        >
                          Logout
                        </button>
                        <button
                          onClick={handleCancelLogout}
                          className={`px-3 py-1 text-sm rounded transition-colors duration-200 flex-1 `}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
                    
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      )}

      {/* Settings Drawer */}
      <SettingsDrawer isOpen={isSettingsDrawerOpen} onClose={() => setIsSettingsDrawerOpen(false)} />

      {/* Add this to your global CSS or a CSS module */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Nav;