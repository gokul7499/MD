import React, { useState } from "react";
import {
  FaPaintRoller,
  FaCouch,
  FaHammer,
  FaRulerCombined,
  FaSnowflake,
  FaTree,
  FaTools,
  FaDraftingCompass,
  FaBuilding,
} from "react-icons/fa";
import { FaPaintbrush, FaBuildingColumns } from "react-icons/fa6";
import { SiBandsintown } from "react-icons/si";
import { IoHome, IoFlash, IoWaterOutline } from "react-icons/io5";
import { GiPlantSeed, GiVineLeaf, GiWaterDrop } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ServiceCarousel from "./ServiceCarousel";
import HomePainting from "./HomePainting";
import NewAndNoteworthy from "./NewAndNoteworthy";
import VideoCarousel from "./VideoCarousel";
import ApplianceRepairCarousel from "./applianceServices";
import ServiceModal from "./SeriveModal";
import FurniturePlanningModal from "./FurniturePlanningModal";
import HomePlanningModal from "./HomePlanningModal";
import FlooringModal from "./FlooringModal";
import PopWorkModal from "./PopWorkModal";
import PaintingModal from "./Painting";
import ConstructionModal from "./ConstructionModal";
const services = [
  { name: "Construction work", icon: <FaHammer /> },
  { name: "Painting Work", icon: <FaPaintRoller /> },
  { name: "Pop Work", icon: <FaRulerCombined /> },
  { name: "Flooring Work", icon: <FaTools /> },
  { name: "AC & Appliance", icon: <FaSnowflake /> },
  { name: "Landscaping", icon: <FaTree /> },
  { name: "Home Plan", icon: <FaDraftingCompass /> },
  { name: "Furniture", icon: <FaCouch /> },
];





const LandingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    { name: "Construction of Garden", icon: <FaBuilding /> },
    { name: "Terrace Garden", icon: <FaTree /> },
    { name: "Kitchen Garden", icon: <GiPlantSeed /> },
    { name: "Vertical Garden", icon: <GiVineLeaf /> },
    { name: "Hydroponic Farming", icon: <GiWaterDrop /> },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-xl relative">
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-black"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold text-center mb-6">
          Landscaping Work
        </h2>
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
// ✅ Pop Work Modal Component


// ✅ Main Home Component
const Home = () => {
  const [showConstructionModal, setShowConstructionModal] = useState(false);
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [showPopworkModal, setShowPopworkModal] = useState(false);
  const [showLandingModal, setShowLandingModal] = useState(false);
  const [ACmodalOpen, setACModalOpen] = useState(false);
  const [showFurnitureModal, setShowFurnitureModal] = useState(false);
  const [showHomePlanModal, setHomePlanShowModal] = useState(false);
  const [showFlooringModal, setFlooringShowModal] = useState(false);
  const [showPopModal, setShowPopModal] = useState(false);
  const handleClose = () => setHomePlanShowModal(false);

  const handleSelectPlan = (planType) => {
    console.log("Selected:", planType);
    setHomePlanShowModal(false); // Close modal after selection
  };
  return (
    <div className="bg-white mt-0.6">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-[500px] md:h-[600px] w-full"
      >
        <SwiperSlide>
          <img
            src="/img/Worker.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/img/cons.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/img/plumer.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>

      {/* Services Section */}
      <div className="py-10 px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Select Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-50 hover:bg-blue-100 transition-all rounded-xl p-5 flex flex-col items-center text-center shadow-md cursor-pointer"
              onClick={() => {
                if (service.name === "Construction work")
                  setShowConstructionModal(true);
                if (service.name === "Painting Work")
                  setShowPaintingModal(true);
                if (service.name === "Pop Work") setShowPopworkModal(true);
                if (service.name === "Landscaping") setShowLandingModal(true);
                if (service.name === "AC & Appliance") setACModalOpen(true);
                if (service.name === "Furniture") setShowFurnitureModal(true);
                if (service.name === "Home Plan") setHomePlanShowModal(true);
                if (service.name === "Flooring Work") setFlooringShowModal(true);
                if (service.name === "Pop Work") setShowPopModal(true);
              }}
            >
              <div className="text-blue-600 text-3xl mb-3">{service.icon}</div>
              <p className="text-gray-800 font-medium">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src="/img/AC.jpg"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt="AC Work"
          />
          <img
            src="/img/Plumbing.png"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt="Water Work"
          />
          <img
            src="/img/lawn.jpg"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt="Lawn"
          />
          <img
            src="/img/garden.jpg"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt="Garden"
          />
        </div>
      </div>

      <ServiceCarousel />
      <HomePainting />
      <NewAndNoteworthy />
      <VideoCarousel />
      <ApplianceRepairCarousel />

      {/* Modals */}

      <LandingModal
        isOpen={showLandingModal}
        onClose={() => setShowLandingModal(false)}
      />
      <ConstructionModal
        isOpen={showConstructionModal}
        onClose={() => setShowConstructionModal(false)}
      />
      <PaintingModal
        isOpen={showPaintingModal}
        onClose={() => setShowPaintingModal(false)}
      />
      {showHomePlanModal && (
        <HomePlanningModal
          onClose={handleClose}
          onSelectPlan={handleSelectPlan}
        />
      )}
      <FurniturePlanningModal
        isOpen={showFurnitureModal}
        onClose={() => setShowFurnitureModal(false)}
      />
      {/* <PopWorkModal  isOpen={showPopWorkModal} onClose={() => setPopWorkShowModal(false)} /> */}
      {showFlooringModal && (
        <FlooringModal
          isOpen={showFlooringModal}
          onClose={() => setFlooringShowModal(false)}
        />
      )}

      <ServiceModal
        isOpen={ACmodalOpen}
        onClose={() => setACModalOpen(false)}
      />
       {showPopModal && (
        <PopWorkModal  isOpen={showPopModal} onClose={() => setShowPopModal(false)} />
      )}
    </div>
  );
};

export default Home;
