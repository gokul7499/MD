import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor globally */}
      <style>
        {`
          * {
            cursor: none !important;
          }
          button, a {
            cursor: none !important;
          }
        `}
      </style>

      {/* Custom Cursor Image */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transform: `translate(${position.x - 25}px, ${position.y - 25}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <img
          src="/img/cursor.png" // ✅ Replace with correct image path
          alt="Cursor"
          className="w-[35px] h-[35px] select-none"
          draggable={false}
        />
        
        {/* Optional Animated Dot Inside (remove if not needed) */}
        <div
          className="absolute top-1/2 left-1/2 w-[8px] h-[8px] bg-white rounded-full animate-pulse"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      </div>
    </>
  );
};

export default CustomCursor;
