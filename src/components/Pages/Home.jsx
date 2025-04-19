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

import { GiPlantSeed, GiVineLeaf, GiWaterDrop } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

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
  { name: "construction_work", icon: <FaHammer /> },
  { name: "painting_work", icon: <FaPaintRoller /> },
  { name: "pop_work", icon: <FaRulerCombined /> },
  { name: "flooring_work", icon: <FaTools /> },
  { name: "ac_appliance", icon: <FaSnowflake /> },
  { name: "landscaping", icon: <FaTree /> },
  { name: "home_plan", icon: <FaDraftingCompass /> },
  { name: "furniture", icon: <FaCouch /> },
];

const LandingModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const items = [
    { name: "construction_garden", icon: <FaBuilding /> },
    { name: "terrace_garden", icon: <FaTree /> },
    { name: "kitchen_garden", icon: <GiPlantSeed /> },
    { name: "vertical_garden", icon: <GiVineLeaf /> },
    { name: "hydroponic_farming", icon: <GiWaterDrop /> },
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
          {t('landscaping_work')}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:bg-blue-100 transition-all rounded-lg flex flex-col items-center justify-center p-6"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-gray-800 font-medium">{t(item.name)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
  const { t } = useTranslation();

  const handleSelectPlan = (planType) => {
    console.log("Selected:", planType);
    setHomePlanShowModal(false);
  };

  return (
    <div className="bg-white mt-0.6">
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
            src="/img/Constructionwork.png"
            alt={t('slide1_alt')}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/img/cons.jpg"
            alt={t('slide2_alt')}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
       
        <SwiperSlide>
          <img
            src="/img/plumer.jpg"
            alt={t('slide3_alt')}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>

      <div className="py-10 px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {t('select_services')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-50 hover:bg-blue-100 transition-all rounded-xl p-5 flex flex-col items-center text-center shadow-md cursor-pointer"
              onClick={() => {
                if (service.name === "construction_work")
                  setShowConstructionModal(true);
                if (service.name === "painting_work")
                  setShowPaintingModal(true);
                if (service.name === "pop_work") setShowPopworkModal(true);
                if (service.name === "landscaping") setShowLandingModal(true);
                if (service.name === "ac_appliance") setACModalOpen(true);
                if (service.name === "furniture") setShowFurnitureModal(true);
                if (service.name === "home_plan") setHomePlanShowModal(true);
                if (service.name === "flooring_work") setFlooringShowModal(true);
                if (service.name === "pop_work") setShowPopModal(true);
              }}
            >
              <div className="text-blue-600 text-3xl mb-3">{service.icon}</div>
              <p className="text-gray-800 font-medium">{t(service.name)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src="/img/AC.jpg"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt={t('ac_work_alt')}
          />
          <img
            src="/img/Plumbing.png"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt={t('water_work_alt')}
          />
          <img
            src="/img/lawn.jpg"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt={t('lawn_alt')}
          />
          <img
            src="/img/garden.jpg"
            className="rounded-xl object-cover w-full h-44 md:h-48"
            alt={t('garden_alt')}
          />
        </div>
      </div>
   
      <ServiceCarousel />
      <HomePainting />
      <NewAndNoteworthy />
      <VideoCarousel />
      <ApplianceRepairCarousel />

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
        <PopWorkModal isOpen={showPopModal} onClose={() => setShowPopModal(false)} />
      )}
    </div>
  );
};

export default Home;