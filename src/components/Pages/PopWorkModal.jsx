import React from 'react';
import { X } from 'lucide-react';
import { Home, TreePine, Droplet } from 'lucide-react';

const PopWorkModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Pop Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg hover:bg-gray-200 cursor-pointer transition">
            <Home size={36} className="mb-2 text-gray-800" />
            <p className="text-gray-800 font-medium">PVC Pop</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg hover:bg-gray-200 cursor-pointer transition">
            <TreePine size={36} className="mb-2 text-gray-800" />
            <p className="text-gray-800 font-medium">WPVC Pop</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg hover:bg-gray-200 cursor-pointer transition sm:col-span-2">
            <Droplet size={36} className="mb-2 text-gray-800" />
            <p className="text-gray-800 font-medium">Gypsum Pop</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopWorkModal;
