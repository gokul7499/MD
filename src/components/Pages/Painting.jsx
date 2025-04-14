import React, { useState } from 'react';
import { X } from 'lucide-react';
import { IoHome, IoWaterOutline } from 'react-icons/io5';
import { FaTree, FaPaintRoller } from 'react-icons/fa';
import ServiceCarousel from './ServiceCa';

const imageMap = {
  Indoor: '/img/indoor.jpg',
  Outdoor: '/img/Outdoor.jpg',
  Waterproofing: '/img/WaterP.jpg',
  Wallpaper: '/img/Wallpaper.jpg',
};

const PaintingModal = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState(null);

  if (!isOpen) return null;

  const items = [
    { name: 'Indoor', icon: <IoHome /> },
    { name: 'Outdoor', icon: <FaTree /> },
    { name: 'Waterproofing', icon: <IoWaterOutline /> },
    { name: 'Wallpaper', icon: <FaPaintRoller /> }, // Changed to FaPaintRoller
  ];

  return (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]">
         <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Painting Work</h2>

        {!selectedService ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(item.name)}
                className="bg-gray-100 hover:bg-blue-100 transition-all rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-gray-800 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <img
              src={imageMap[selectedService]}
              alt={`${selectedService} banner`}
              className="rounded-lg w-full h-48 object-cover mb-6"
            />
            <ServiceCarousel />
          </>
        )}
      </div>
    </div>
  );
};

export default PaintingModal;