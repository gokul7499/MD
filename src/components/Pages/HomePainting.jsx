// import React from 'react';

// const HomePainting = () => {
//   return (
//     <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl px-4 py-6 md:px-8 md:py-8 mx-auto max-w-[77rem] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-md hover:shadow-lg transition-shadow duration-300">
      
//       {/* Text Section */}
//       <div className="flex-1 text-center lg:text-left space-y-3 lg:space-y-4">
//         <p className="text-gray-700 text-base md:text-lg font-medium">
//           Give your space the glow-up it deserves
//         </p>
//         <h2 className="text-2xl md:text-3xl font-bold text-pink-700">
//           Home Painting
//         </h2>
//         <div className="flex justify-center lg:justify-start">
//           <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 text-sm rounded-md transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
//             Book now
//           </button>
//         </div>
//       </div>

//       {/* Image Section */}
//       <div className="flex-1 w-full lg:w-auto">
//         <img
//           src="img/trees.jpg"
//           alt="Home Painting"
//           className="rounded-lg shadow-sm w-full h-auto max-h-[180px] md:max-h-[220px] object-cover object-center"
//         />
//       </div>
//     </div>
//   );
// };

// export default HomePainting;


import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const HomePainting = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl px-4 py-6 md:px-8 md:py-8 mx-auto max-w-[77rem] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-md hover:shadow-lg transition-shadow duration-300">
      
      {/* Text Section */}
      <div className="flex-1 text-center lg:text-left space-y-3 lg:space-y-4">
        <p className="text-gray-700 text-base md:text-lg font-medium">
          {t('homePainting.glowUpText')}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-pink-700">
          {t('homePainting.title')}
        </h2>
        <div className="flex justify-center lg:justify-start">
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 text-sm rounded-md transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
            {t('homePainting.bookNow')}
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 w-full lg:w-auto">
        <img
          src="img/paints.png"
          alt={t('homePainting.altText')}
          className="rounded-lg shadow-sm w-full h-auto max-h-[180px] md:max-h-[220px] object-cover object-center"
        />
      </div>
    </div>
  );
};

export default HomePainting;
