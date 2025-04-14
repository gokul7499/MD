import React, { useState, useEffect } from 'react';
import { FaUser, FaBars, FaTimes, FaCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate here
import { ShoppingCart } from "lucide-react";
import CartDrawer from '../Cart/Cart';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';
import { useTranslation } from 'react-i18next';

const Nav = ({ onCartClick }) => {
  const navigate = useNavigate(); // Initialize the navigate hook here
  const [location, setLocation] = useState('delhi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const { t } = useTranslation();

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleUserIconClick = () => {
    navigate('/login');  // Use navigate to go to profile page
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300`}>
        <nav className="flex items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            MD Developer
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-base font-medium">
            <Link to="/" className="text-gray-600 hover:text-black">{t('home')}</Link>
            <Link to="/shop" className="text-gray-600 hover:text-black">{t('shop')}</Link>
            <Link to="/contact" className="text-gray-600 hover:text-black">{t('contact')}</Link>
          </div>

          {/* Desktop Right Side */}
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

            <button onClick={handleUserIconClick}>  {/* Add the click handler for user icon */}
              <FaUser className="text-xl cursor-pointer hover:text-black text-gray-700" />
            </button>

            <button onClick={() => setIsSettingsDrawerOpen(true)} className="text-xl text-gray-700 hover:text-black">
              <FaCog />
            </button>
            
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
            <Link
              to="/"
              onClick={() => {
                closeMobileMenu();  // Close the mobile menu on click
              }}
              className="py-2 text-gray-600 hover:text-black"
            >
              {t('home')}
            </Link>
            <Link
              to="/shop"
              onClick={() => {
                closeMobileMenu();  // Close the mobile menu on click
              }}
              className="py-2 text-gray-600 hover:text-black"
            >
              {t('shop')}
            </Link>
            <Link
              to="/contact"
              onClick={() => {
                closeMobileMenu();  // Close the mobile menu on click
              }}
              className="py-2 text-gray-600 hover:text-black"
            >
              {t('contact')}
            </Link>
            <button
              onClick={() => {
                setIsSettingsDrawerOpen(true);
                closeMobileMenu();  // Close the mobile menu on click
              }}
              className="py-2 text-gray-600 hover:text-black flex items-center gap-2"
            >
              <FaCog /> {t('settings')}
            </button>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  closeMobileMenu();  // Close the mobile menu on click
                }}
                className="text-gray-700 hover:text-black"
              >
                <ShoppingCart size={24} />
              </button>
              <button onClick={() => {
                closeMobileMenu();
                handleUserIconClick();  // Navigate to profile page on click
              }}>
                <FaUser className="text-xl cursor-pointer hover:text-black text-gray-700" />
              </button>
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
    </>
  );
};

export default Nav;
