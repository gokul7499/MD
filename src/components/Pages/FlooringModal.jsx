import { FaHome } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";

export default function FlooringModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-center text-gray-800">All Flooring Work</h2>
          <button
            onClick={onClose}
            className="text-purple-500 text-xl hover:text-purple-700"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tile Card */}
          <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center py-8 hover:shadow-md transition cursor-pointer">
            <FaHome className="text-3xl mb-2 text-gray-800" />
            <p className="text-gray-800 font-medium">Tile</p>
          </div>

          {/* Carpet Card */}
          <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center py-8 hover:shadow-md transition cursor-pointer">
            <FaLayerGroup className="text-3xl mb-2 text-gray-800" />
            <p className="text-gray-800 font-medium">Carpet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
