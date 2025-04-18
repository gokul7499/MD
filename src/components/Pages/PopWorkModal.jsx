'use client';

import React, { useState, useEffect } from 'react';
import { X, Home, TreePine, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCarousel from './ServiceCa'; // Make sure this path is correct
import { useTranslation } from 'react-i18next';

const imageMap = {
  PVC: '/img/Pvc.jpg',
  WPVC: '/img/wpvc.jpg',
  GYPSUM: '/img/gyp.jpg',
};

const PopWorkModal = ({ onClose }) => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleServiceClick = (type) => {
    setSelectedService(type);
  };

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg w-[98%] max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]"
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        exit={{ y: '100vh' }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">{t('popWork.title')}</h2>

        {!selectedService ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              onClick={() => handleServiceClick('PVC')}
              className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg cursor-pointer transition"
              whileHover={{ scale: 1.05 }}
            >
              <Home size={36} className="mb-2 text-gray-800" />
              <p className="text-gray-800 font-medium">{t('popWork.pvc')}</p>
            </motion.div>

            <motion.div
              onClick={() => handleServiceClick('WPVC')}
              className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg cursor-pointer transition"
              whileHover={{ scale: 1.05 }}
            >
              <TreePine size={36} className="mb-2 text-gray-800" />
              <p className="text-gray-800 font-medium">{t('popWork.wpvc')}</p>
            </motion.div>

            <motion.div
              onClick={() => handleServiceClick('GYPSUM')}
              className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg cursor-pointer transition sm:col-span-2"
              whileHover={{ scale: 1.05 }}
            >
              <Droplet size={36} className="mb-2 text-gray-800" />
              <p className="text-gray-800 font-medium">{t('popWork.gypsum')}</p>
            </motion.div>
          </div>
        ) : (
          <div>
            <motion.div
              className="mb-6 relative rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={imageMap[selectedService]}
                alt={`${selectedService} Banner`}
                className="w-full h-60 object-cover filter blur-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-lg">
                <p className="text-white text-lg font-semibold">
                  {`${t('popWork.overlay')} ${selectedService} POP`}
                </p>
              </div>
            </motion.div>

            <ServiceCarousel selectedService={selectedService} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PopWorkModal;
