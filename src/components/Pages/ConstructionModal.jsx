import React, { useState } from "react";
import { X } from "lucide-react";
import { FaHome, FaBuilding, FaPaintRoller, FaLightbulb } from "react-icons/fa";
import ServiceCarousel from "./ServiceCa"; // Reuse same component

const ConstructionModal = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState(null);

  if (!isOpen) return null;

  const services = [
    { name: "Home", icon: <FaHome size={28} /> },
    { name: "Building", icon: <FaBuilding size={28} /> },
    { name: "Plaster", icon: <FaPaintRoller size={28} /> },
    { name: "Style", icon: <FaLightbulb size={28} /> },
  ];

  const imageMap = {
    Home: "/img/home.jpg",
    Building: "/img/building.jpg",
    Plaster: "/img/plaster.jpg",
    Style: "/img/style.jpg",
  };

  const handleServiceClick = (type) => {
    setSelectedService(type);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-lg w-[98%] max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]">
      <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Construction Work</h2>

        {!selectedService ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => handleServiceClick(service.name)}
                className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg hover:bg-gray-200 cursor-pointer transition"
              >
                <div className="mb-2 text-gray-800">{service.icon}</div>
                <p className="text-gray-800 font-medium">{service.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Banner */}
            <div className="mb-6">
              <img
                src={imageMap[selectedService]}
                alt={`${selectedService} Banner`}
                className="rounded-lg w-full object-cover max-h-60"
              />
            </div>

            {/* Reusable Carousel */}
            <ServiceCarousel />
          </>
        )}
      </div>
    </div>
  );
};

export default ConstructionModal;
