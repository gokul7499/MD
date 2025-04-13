import React from "react";
import { FaDraftingCompass, FaCube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const HomePlanningModal = ({ onClose, onSelectPlan }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl relative mx-4">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-500 text-2xl hover:text-purple-700"
        >
          <IoClose />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
          All Home Plannings
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 2D Plan */}
          <button
            onClick={() => onSelectPlan("2D")}
            className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-xl hover:bg-gray-200 transition"
          >
            <FaDraftingCompass className="text-3xl mb-2" />
            <span className="text-base font-medium">2D Plan</span>
          </button>

          {/* 3D Plan */}
          <button
            onClick={() => onSelectPlan("3D")}
            className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-xl hover:bg-gray-200 transition"
          >
            <FaCube className="text-3xl mb-2" />
            <span className="text-base font-medium">3D Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePlanningModal;
