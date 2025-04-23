

import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1e1e1e] text-gray-300 pt-10 pb-6 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Company Info */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center justify-center md:justify-start">
            <span className="text-2xl font-bold text-white">MD Developer</span>
          </Link>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs">
            {t('footerDescription')}
          </p>
          <div className="flex space-x-4 pt-1 justify-center md:justify-start">
            <a href="https://www.facebook.com/people/Manoj-Wakchoure/pfbid027pEYXhGUEd7vWviWsEefXKQf4RCPbuKfKdqronj67QaZZiX7AdwFNKZefz51dGU1l/" className="text-white hover:text-blue-500 transition"><FaFacebook size={18} /></a>
            <a href="https://www.instagram.com/md_devolopers/?igsh=NTc4MTIwNjQ2YQ%3D%3D#" className="text-white hover:text-pink-500 transition"><FaInstagram size={18} /></a>
            <a 
  href="https://www.linkedin.com/in/manoj-wakchaure-mddevlopers" 
  className="text-white hover:text-green-500 transition" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <FaLinkedin size={18} />
</a>

            <a href="https://www.linkedin.com/in/manoj-wakchaure-mddevlopers" className="text-white hover:text-green-500 transition"><FaWhatsapp size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">{t('quickLinks')}</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-white text-sm flex items-center justify-center md:justify-start hover:text-blue-400 transition">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>{t('home')}
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-white text-sm flex items-center justify-center md:justify-start hover:text-blue-400 transition">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>{t('shop')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white text-sm flex items-center justify-center md:justify-start hover:text-blue-400 transition">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>{t('contacts')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">{t('ourServices')}</h3>
          <ul className="space-y-2">
            {['Residential', 'Commercial', 'Interiors', 'Renovation'].map((service) => (
              <li key={service} className="text-white text-sm flex items-center justify-center md:justify-start hover:text-blue-400 transition">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                {t(service.toLowerCase())}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">{t('contactUs')}</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center justify-center md:justify-start"><FaMapMarkerAlt className="mr-2" />123 Developer Lane, Pune, India</li>
            <li className="flex items-center justify-center md:justify-start"><FaPhone className="mr-2" />+91 98765 43210</li>
            <li className="flex items-center justify-center md:justify-start"><FaEnvelope className="mr-2" />info@mddeveloper.com</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MD Developer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
