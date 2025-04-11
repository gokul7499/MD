


import React, { useState } from 'react';
import {
  FaPaintRoller, FaCouch, FaHammer,
  FaRulerCombined, FaSnowflake,
  FaTree, FaTools, FaDraftingCompass
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ServiceCarousel from './ServiceCarousel';
import HomePainting from './HomePainting';
import NewAndNoteworthy from './NewAndNoteworthy';
import VideoCarousel from './VideoCarousel';
import ApplianceRepairCarousel from './applianceServices';
import { IoHome } from "react-icons/io5";
import { FaBuildingColumns } from "react-icons/fa6";
import { SiBandsintown } from "react-icons/si";
import { FaPaintbrush } from "react-icons/fa6";
import { IoFlash } from "react-icons/io5";
import { IoWaterOutline } from "react-icons/io5";

// ✅ Services Array
const services = [
  { name: 'Construction work', icon: <FaHammer /> },
  { name: 'Painting Work', icon: <FaPaintRoller /> },
  { name: 'Pop Work', icon: <FaRulerCombined /> },
  { name: 'Flooring Work', icon: <FaTools /> },
  { name: 'AC & Appliance', icon: <FaSnowflake /> },
  { name: 'Landscaping', icon: <FaTree /> },
  { name: 'Home Plan', icon: <FaDraftingCompass /> },
  { name: 'Furniture', icon: <FaCouch /> },
];

// ✅ Construction Modal Component
const ConstructionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    { name: "Home", icon:<IoHome />
    },
    { name: "Building", icon: <FaBuildingColumns />
    },
    { name: "Bandhkam", icon:<SiBandsintown />
    },
    { name: "Plastar", icon:<FaPaintbrush />
    },
    { name: "Style", icon:<IoFlash />
    },
    { name: "Landscaping", icon:<FaTree />
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-xl relative">
        <button className="absolute top-3 right-3 text-2xl font-bold text-black" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold text-center mb-6">All Construction Work</h2>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:bg-blue-100 transition-all rounded-lg flex flex-col items-center justify-center h-24 p-3"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-gray-800 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ Painting Modal Component
const PaintingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    { name: "Indoor", icon:<IoHome /> },
    { name: "Outdoor", icon:<FaTree />},
    { name: "Waterproofing", icon:<IoWaterOutline />
    },
    { name: "Wallpaper", icon:<FaPaintbrush />},
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-xl relative">
        <button className="absolute top-3 right-3 text-2xl font-bold text-black" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold text-center mb-6">All Painting Work</h2>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:bg-blue-100 transition-all rounded-lg flex flex-col items-center justify-center p-6"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-gray-800 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ Pop Work Modal Component (Fixed Name)
const PopworkModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    { name: "Indoor", icon: "🏠" },
    { name: "Outdoor", icon: "🌲" },
    { name: "Waterproofing", icon: "💧" },
    { name: "Wallpaper", icon: "🎨" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-xl relative">
        <button className="absolute top-3 right-3 text-2xl font-bold text-black" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold text-center mb-6">All Pop Work</h2>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:bg-blue-100 transition-all rounded-lg flex flex-col items-center justify-center p-6"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-gray-800 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ Home Component
const Home = () => {
  const [showConstructionModal, setShowConstructionModal] = useState(false);
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [showPopworkModal, setShowPopworkModal] = useState(false);

  return (
    <div className="bg-white mt-0.6">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-[450px] md:h-[540px] w-full"
      >
        <SwiperSlide>
          <img src="/img/Constructionwork.png" alt="Slide 1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/cons.jpg" alt="Slide 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/plumer.jpg" alt="Slide 3" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>

      {/* Services Section */}
      <div className="py-10 px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-50 hover:bg-blue-100 transition-all rounded-xl p-5 flex flex-col items-center text-center shadow-md cursor-pointer"
              onClick={() => {
                if (service.name === "Construction work") setShowConstructionModal(true);
                if (service.name === "Painting Work") setShowPaintingModal(true);
                if (service.name === "Pop Work") setShowPopworkModal(true);
              }}
            >
              <div className="text-blue-600 text-3xl mb-3">{service.icon}</div>
              <p className="text-gray-800 font-medium">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/img/AC.jpg" className="rounded-xl object-cover w-full h-44 md:h-48" alt="AC Work" />
          <img src="/img/water.jpg" className="rounded-xl object-cover w-full h-44 md:h-48" alt="Water Work" />
          <img src="/img/lawn.jpg" className="rounded-xl object-cover w-full h-44 md:h-48" alt="Lawn" />
          <img src="/img/garden.jpg" className="rounded-xl object-cover w-full h-44 md:h-48" alt="Garden" />
        </div>
      </div>
<ServiceCarousel/>
<HomePainting/>
<NewAndNoteworthy/>
<VideoCarousel/>
<ApplianceRepairCarousel/>

      {/* Modals */}
      <ConstructionModal isOpen={showConstructionModal} onClose={() => setShowConstructionModal(false)} />
      <PaintingModal isOpen={showPaintingModal} onClose={() => setShowPaintingModal(false)} />
      <PopworkModal isOpen={showPopworkModal} onClose={() => setShowPopworkModal(false)} />
    </div>
    
  );
};

export default Home;


