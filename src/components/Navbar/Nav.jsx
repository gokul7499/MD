import React, { useState } from 'react';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import CartDrawer from '../Cart/Cart';

const Nav = () => {
  const [location, setLocation] = useState('Connaught Place, New Delhi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <div className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300 ${isCartOpen ? "md:pr-80" : ""}`}>
        <nav className="flex items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            MD Developer
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-base font-medium">
            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-black">Shop</Link>
            <Link to="/contact" className="text-gray-600 hover:text-black">Contact Us</Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
            >
              <option>Connaught Place, New Delhi</option>
              <option>CP, Delhi</option>
              <option>Mumbai</option>
              <option>Pune</option>
            </select>

            <input
              type="text"
              placeholder="Search for"
              className="border border-gray-300 rounded-md px-3 py-2 md:w-64 text-gray-700"
            />

            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-700 hover:text-black">
              <ShoppingCart size={24} />
            </button>

            <Link to="/login">
              <FaUser className="text-xl cursor-pointer hover:text-black text-gray-700" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-2xl text-gray-800"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-4 space-y-6 bg-white border-t border-gray-200">
            <div className="flex flex-col items-center space-y-3 text-base font-medium">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-black">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-black">Shop</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-black">Contact Us</Link>
            </div>

            <div className="flex flex-col space-y-3">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
              >
                <option>Connaught Place, New Delhi</option>
                <option>CP, Delhi</option>
                <option>Mumbai</option>
                <option>Pune</option>
              </select>

              <input
                type="text"
                placeholder="Search for"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
              />
            </div>

            <div className="flex justify-around pt-2 text-xl text-gray-700">
              <ShoppingCart className="cursor-pointer hover:text-black" />
              <FaUser className="cursor-pointer hover:text-black" />
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer Component */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Nav;
