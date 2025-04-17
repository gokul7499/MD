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
      <style>{`* { cursor: none !important; }`}</style>

      {/* Cursor Image */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transform: `translate(${position.x - 30}px, ${position.y - 30}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <img
          src="/img/cursor.png" // Make sure path is correct
          alt="Custom Cursor"
          className="w-[35px] h-[35px] select-none"
          draggable={false}
        />

        {/* Moving Dot Inside */}
        <div
          className="absolute top-[50%] left-[50%] w-[8px] h-[8px] rounded-full bg-white animate-ping"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      </div>
    </>
  );
};

export default CustomCursor;
