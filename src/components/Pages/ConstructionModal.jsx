import React, { useState } from "react";
import { X } from "lucide-react";
import { FaHome, FaBuilding, FaPaintRoller, FaLightbulb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCarousel from "./ServiceCa";

// Animation variants
const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const ConstructionModal = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState(null);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-[98%] max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>

            <motion.h2
              className="text-2xl font-bold text-center mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Construction Work
            </motion.h2>

            {!selectedService ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleServiceClick(service.name)}
                    className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg cursor-pointer transition"
                  >
                    <div className="mb-2 text-gray-800">{service.icon}</div>
                    <p className="text-gray-800 font-medium">{service.name}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <>
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={imageMap[selectedService]}
                    alt={`${selectedService} Banner`}
                    className="rounded-lg w-full object-cover max-h-60"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <ServiceCarousel />
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConstructionModal;
