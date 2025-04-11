import React from 'react';

const HomePainting = () => {
  return (
    <div className="bg-teal-100 rounded-2xl px-6 py-6 md:px-10 md:py-5 mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-7 shadow-lg">
      
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left">
        <p className="text-gray-700 text-lg md:text-xl font-medium">
          Give your space the glow-up it deserves
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mt-3">
          \ Home Painting
        </h2>
        <button className="mt-6 bg-pink-600 text-white px-6 py-2 text-sm md:text-base rounded-lg hover:bg-pink-700 transition-all duration-300">
          Buy now
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        <img
          src="img/trees.jpg"
          alt="Home Painting"
          className="rounded-xl shadow-xl w-full h-auto max-h-[250px] md:max-h-[300px] object-cover"
        />
      </div>
    </div>
  );
};

export default HomePainting;