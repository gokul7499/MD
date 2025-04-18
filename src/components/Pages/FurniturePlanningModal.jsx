


import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TreePine, Building2, Boxes, Martini, WrenchIcon, Sofa 
} from 'lucide-react'; // Using WrenchIcon instead of Wrench

const furnitureItems = [
  { name: 'Bamboo furniture', icon: <TreePine size={28} /> },
  { name: 'Bombay furniture', icon: <Building2 size={28} /> },
  { name: 'Concrete furniture', icon: <Boxes size={28} /> },
  { name: 'Glass furniture', icon: <Martini size={28} /> },
  { name: 'Metal furniture', icon: <WrenchIcon size={28} /> },
  { name: 'Wooden furniture', icon: <Sofa size={28} /> },
];

const FurniturePlanningModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center px-2">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{t('allFurniturePlanning')}</h2>
          <button onClick={onClose} className="text-purple-500 hover:text-purple-700 text-2xl font-bold">
            &times;
          </button>
        </div>

        {/* Furniture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {furnitureItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-xl py-6 px-4 flex flex-col justify-center items-center hover:bg-gray-200 transition cursor-pointer"
            >
              <div className="mb-2 text-gray-800">{item.icon}</div>
              <p className="font-medium text-gray-700 text-center">{t(item.name)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FurniturePlanningModal;

