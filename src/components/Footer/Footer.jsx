import React from 'react';
import { FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">

        {/* About */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-green-400">About Me</h4>
          <p className="text-gray-300 text-sm leading-6">
            I'm a full-stack MERN developer with a passion for crafting user-friendly and scalable web applications. Dedicated to delivering quality digital experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
            <li><Link to="/projects" className="hover:text-green-400 transition">Projects</Link></li>
            <li><Link to="/about" className="hover:text-green-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-green-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-green-400">Contact</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-500" /> your.email@example.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-500" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" /> Pune, India
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-green-400">Connect</h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
              title="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="hover:text-green-500 transition"
              title="Send Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} Vaibhav Sonawane. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
