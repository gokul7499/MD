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
import { IoHome } from "react-icons/io5";
import { FaBuildingColumns } from "react-icons/fa6";
import { SiBandsintown } from "react-icons/si";
import { FaPaintbrush } from "react-icons/fa6";
import { IoFlash, IoWaterOutline } from "react-icons/io5";
import ServiceCarousel from './ServiceCarousel';
import HomePainting from './HomePainting';
import NewAndNoteworthy from './NewAndNoteworthy';
import VideoCarousel from './VideoCarousel';
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
  const [addedServices, setAddedServices] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null); // ✅ This line fixes the error
  const [selectedServices, setSelectedServices] = useState([]);

  if (!isOpen) return null;
  const subcategories = [
    { name: "Home", icon: <IoHome /> },
    { name: "Building", icon: <FaBuildingColumns /> },
    { name: "Bandhkam", icon: <SiBandsintown /> },
    { name: "Plastar", icon: <FaPaintbrush /> },
    { name: "Style", icon: <IoFlash /> },
    { name: "Landscaping", icon: <FaTree /> },
  ];


  const bandkamServices = [
    { title: "55 Plus Housing", desc: "The 55+ niche is vitally important...", rating: "4.85", reviews: "1.9M" },
    { title: "Concrete Building", desc: "Concrete has been an essential...", rating: "4.86", reviews: "2.2M" },
    { title: "Custom Homes", desc: "Custom builders create homes for each owner...", rating: "4.86", reviews: "2.2M" },
    { title: "Log Homes", desc: "Log homes feel like going on vacation every day.", rating: "4.86", reviews: "2.2M" },
  ];

  const handleAddService = (service) => {
    const exists = addedServices.some((s) => s.title === service.title);
    if (!exists) setAddedServices([...addedServices, service]);
  };

  const handleDeleteService = (title) => {
    setAddedServices(addedServices.filter((s) => s.title !== title));
  };

  const handleSendToWhatsApp = () => {
    const text = addedServices.map((s) => `• ${s.title}`).join('\n');
    const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(`Selected Services:\n${text}`)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
  <div className="relative w-full max-w-5xl mx-auto my-10 px-4">
    <div className="bg-white p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
      <button className="absolute top-4 right-4 text-2xl font-bold text-black" onClick={onClose}>×</button>
      <h2 className="text-xl font-semibold text-center mb-6">All Construction Work</h2>

      {/* Subcategory Icons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {subcategories.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedSub(item.name)}
            className={`bg-gray-100 hover:bg-blue-100 cursor-pointer rounded-lg flex flex-col items-center justify-center p-4 transition-all ${
              selectedSub === item.name ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="text-gray-800 font-medium">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Banner & Services */}
      {selectedSub && (
        <>
          <img
            src={
              selectedSub === "Home" ? "/img/home.jpg" :
              selectedSub === "Bandhkam" ? "/img/Constructionwork.png" :
              selectedSub === "Plastar" ? "/img/plastar.jpg" :
              selectedSub === "Style" ? "/img/style.jpg" :
              selectedSub === "Building" ? "/img/building.jpg" :
              selectedSub === "Landscaping" ? "/img/land.jpg" :
              "/img/default.jpg"
            }
            alt={`${selectedSub} banner`}
            className="rounded-lg mb-4 w-full h-48 md:h-56 lg:h-64 object-cover"
          />

          {/* Services Carousel */}
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="mb-6"
          >
            {bandkamServices.map((service, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white border rounded-lg shadow p-5 h-full">
                  <div className="flex justify-between items-center mt-1">
                    <h4 className="text-green-600 font-bold text-sm mt-2">SERVICE</h4>
                    <button
                      className="border px-4 py-2 text-green-600 border rounded-lg text-sm"
                      onClick={() => handleAddService(service)}
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <div className="text-sm text-gray-700 mt-1">
                      ⭐ {service.rating} ({service.reviews} reviews)
                    </div>
                    <p className="text-gray-700 mt-3">{service.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Added Services */}
          {addedServices.length > 0 && (
            <div className="bg-white p-4 rounded-lg border shadow mb-4">
              <h3 className="text-xl font-bold mb-4 text-center">Added Service will be shown here</h3>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              >
                {addedServices.map((service, index) => (
                  <SwiperSlide key={index}>
                    <div className="border p-4 rounded-lg flex flex-col items-center text-center shadow">
                      <p className="text-gray-800 font-medium mb-2">{service.title}</p>
                      <button
                        className="bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded"
                        onClick={() => handleDeleteService(service.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                className="mt-6 w-full bg-red-400 text-white font-semibold text-lg py-3 rounded-lg"
                onClick={handleSendToWhatsApp}
              >
                Send Services to MD Developers via WhatsApp
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </div>
</div>

  );
};

// ✅ Painting Modal Component
const PaintingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    { name: "Indoor", icon: <IoHome /> },
    { name: "Outdoor", icon: <FaTree /> },
    { name: "Waterproofing", icon: <IoWaterOutline /> },
    { name: "Wallpaper", icon: <FaPaintbrush /> },
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

// ✅ Pop Work Modal Component
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

// ✅ Main Home Component
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
          <img src="/img/Plumbing.png" className="rounded-xl object-cover w-full h-44 md:h-48" alt="Water Work" />
          <img src="/img/lawn.jpg" className="rounded-xl object-cover w-full h-44 md:h-48" alt="Lawn" />
          <img src="/img/garden.jpg" className="rounded-xl object-cover w-full h-44 md:h-48" alt="Garden" />
        </div>
      </div>

      <ServiceCarousel/>
<HomePainting/>
<NewAndNoteworthy/>
<VideoCarousel/>

      {/* Modals */}
      <ConstructionModal isOpen={showConstructionModal} onClose={() => setShowConstructionModal(false)} />
      <PaintingModal isOpen={showPaintingModal} onClose={() => setShowPaintingModal(false)} />
      <PopworkModal isOpen={showPopworkModal} onClose={() => setShowPopworkModal(false)} />
    </div>
  );
};

export default Home;
