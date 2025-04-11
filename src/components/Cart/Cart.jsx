import React from "react";

const CartDrawer = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-xl">&times;</button>
      </div>
      <div className="p-4">
        {/* Cart items here */}
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      </div>
    </div>
  );
};

export default CartDrawer;
