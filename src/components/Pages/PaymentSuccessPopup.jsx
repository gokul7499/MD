import React from 'react';

const PaymentSuccessPopup = ({ orderName, amount, cashback, onClose }) => {
  const timestamp = new Date().toLocaleString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center relative">
        
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Success Icon */}
        <img
          src="/super-mone.webp"
          alt="Success"
          className="w-24 h-24 mx-auto mb-4"
        />

        <h2 className="text-lg font-semibold text-gray-800">Payment Successful</h2>
        <p className="text-gray-600 mt-1">to <strong>{orderName}</strong></p>

        <p className="text-3xl font-bold text-green-700 mt-3">₹{amount}</p>

        {/* Cashback Message */}
        <div className="bg-green-100 border border-green-300 rounded-md py-2 px-4 mt-4 text-green-700 flex items-center justify-center gap-2">
          <span className="text-sm font-medium">🎉 You earned ₹{cashback} cashback</span>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-500 mt-4">{timestamp}</p>

        {/* View Details */}
        <button
          className="text-sm text-blue-600 underline mt-2"
          onClick={() => alert('Showing order details...')}
        >
          View Details
        </button>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white w-full mt-5 py-2 rounded-md font-semibold"
        >
          Done
        </button>

        {/* Logos */}
        <div className="mt-4 text-xs text-gray-400 flex justify-center gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/UPI-Logo-vector.svg" alt="upi" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/RuPay_Logo.svg/2560px-RuPay_Logo.svg.png" alt="rupay" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Yes_Bank_Logo.svg/512px-Yes_Bank_Logo.svg.png" alt="yesbank" className="h-5" />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPopup;
