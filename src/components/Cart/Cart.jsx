// import React from "react";
// import { X } from "lucide-react";

// const CartDrawer = ({ isOpen, onClose }) => {
//   const cartItems = [
    
//       {
//         id: 1,
//         name: "AC Installation (Split)",
//         price: 1499,
//         quantity: 1,
//       },
//       {
//         id: 2,
//         name: "Cement - Ultratech (20 Bags)",
//         price: 5600,
//         quantity: 1,
//       },
//       {
//         id: 3,
//         name: "Labour Charges (8 hrs)",
//         price: 1200,
//         quantity: 1,
//       },
//     ];
    
 
//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
//         <button onClick={onClose}>
//           <X className="text-gray-600" />
//         </button>
//       </div>

//       <div className="p-4 h-[calc(100%-160px)] overflow-y-auto space-y-4">
//         {cartItems.map((item) => (
//           <div key={item.id} className="flex items-center gap-4 border p-2 rounded-md">
            
//             <div className="flex-1">
//               <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
//               <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
//               <div className="mt-1 flex items-center gap-2">
//                 <button className="px-2 py-1 text-sm border rounded hover:bg-gray-200">-</button>
//                 <span className="px-2">{item.quantity}</span>
//                 <button className="px-2 py-1 text-sm border rounded hover:bg-gray-200">+</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart Summary */}
//       <div className="p-4 border-t bg-gray-50">
//         <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
//           <span>Total</span>
//           <span>₹{total.toLocaleString()}</span>
//         </div>
//         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartDrawer;


// import React from 'react';
// import { X } from 'lucide-react';

// const CartDrawer = ({ isOpen, onClose, cartItems }) => {
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
//         <button onClick={onClose}>
//           <X className="text-gray-600" />
//         </button>
//       </div>

//       <div className="p-4 h-[calc(100%-160px)] overflow-y-auto space-y-4">
//         {cartItems.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty.</p>
//         ) : (
//           cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center gap-4 border p-2 rounded-md"
//             >
//               <div className="flex-1">
//                 <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
//                 <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
//                 <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="p-4 border-t bg-gray-50">
//         <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
//           <span>Total</span>
//           <span>₹{total.toLocaleString()}</span>
//         </div>
//         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartDrawer;



import React from 'react';
import { X } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
        <button onClick={onClose}>
          <X className="text-gray-600" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 h-[calc(100%-160px)] overflow-y-auto space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-2 rounded-md"
            >
              <div className="flex-1">
                <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;

