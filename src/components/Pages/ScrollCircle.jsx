import React, { useEffect, useState } from 'react';
import './ScrollCircle.css';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const ScrollCircle = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollPercent(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-buttons-container">
      <a
        href="https://wa.me/7057585497"
        target="_blank"
        rel="noopener noreferrer"
        className="scroll-circle-wrapper"
      >
        <div
          className="scroll-circle"
          style={{
            background: `conic-gradient(#25D366 ${scrollPercent}%, #e0e0e0 ${scrollPercent}% 100%)`
          }}
        >
          <FaWhatsapp className="icon" />
        </div>
      </a>

      <a
        href="tel:+917057585497"
        className="scroll-circle-wrapper"
      >
        <div className="scroll-circle call">
          <FaPhoneAlt className="icon" />
        </div>
      </a>
    </div>
  );
};

export default ScrollCircle;
