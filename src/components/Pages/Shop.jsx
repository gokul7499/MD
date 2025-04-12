import React from 'react';

const materials = [
  { id: 1, name: 'Cement (50kg)', price: 350, image: 'https://via.placeholder.com/150?text=Cement', category: 'Construction' },
  { id: 2, name: 'Bricks (100 pcs)', price: 800, image: 'https://via.placeholder.com/150?text=Bricks', category: 'Construction' },
  { id: 3, name: 'Sand (1 Ton)', price: 1200, image: 'https://via.placeholder.com/150?text=Sand', category: 'Construction' },
  { id: 4, name: 'Steel Rods (12mm)', price: 2500, image: 'https://via.placeholder.com/150?text=Steel+Rods', category: 'Construction' },
  { id: 5, name: 'AC Copper Pipe (1 Meter)', price: 350, image: 'https://via.placeholder.com/150?text=AC+Pipe', category: 'AC' },
  { id: 6, name: 'Split AC Bracket', price: 500, image: 'https://via.placeholder.com/150?text=AC+Bracket', category: 'AC' },
  { id: 7, name: 'AC Gas (R32, 1kg)', price: 600, image: 'https://via.placeholder.com/150?text=AC+Gas', category: 'AC' },
  { id: 8, name: 'Switch Board (4 Switch)', price: 150, image: 'https://via.placeholder.com/150?text=Switch+Board', category: 'Electrical' },
  { id: 9, name: 'Electrical Wire (90m)', price: 1800, image: 'https://via.placeholder.com/150?text=Wire+Roll', category: 'Electrical' },
  { id: 10, name: 'LED Tube Light (18W)', price: 250, image: 'https://via.placeholder.com/150?text=LED+Tube', category: 'Electrical' },
];

const Shop = ({ onBuy }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛒 Construction & AC Material Shop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {materials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-700 text-center">{item.name}</h2>
            <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>
            <p className="text-xs text-gray-400">{item.category}</p>
            <button
              onClick={() => onBuy(item)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
