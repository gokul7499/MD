import React from 'react';

const products = [
  {
    id: 1,
    name: 'Woo Ninja',
    category: 'Hoodies',
    price: 15,
    image: 'https://via.placeholder.com/150?text=Wheelbarrow',
  },
  {
    id: 2,
    name: 'Woo Logo',
    category: 'Hoodies',
    price: 12,
    image: 'https://via.placeholder.com/150?text=Hammer',
  },
  {
    id: 3,
    name: 'Suggest Price',
    category: 'Clothing',
    price: 35,
    image: 'https://via.placeholder.com/150?text=Tool+3',
    sale: true,
  },
  {
    id: 4,
    name: 'Stock Progress Bar',
    category: 'Clothing',
    price: 35,
    image: 'https://via.placeholder.com/150?text=Machine',
  },
  {
    id: 5,
    name: 'Ship Your Idea',
    category: 'Clothing',
    price: 30,
    image: 'https://via.placeholder.com/150?text=Tools+Set',
    priceRange: true,
    sale: true,
  },
  {
    id: 6,
    name: 'Rock Colorful Suit',
    category: 'Hoodies',
    price: 15,
    image: 'https://via.placeholder.com/150?text=Tools+Black',
  },
];

const Shop = ({ onBuy }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-transform transform hover:scale-105 relative"
          >
            {product.sale && (
              <span className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">
                SALE!
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 object-contain mb-3 rounded"
            />
            <p className="text-xs text-gray-500">{product.category}</p>
            <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm font-bold text-gray-700 mt-1">
              {product.priceRange ? `£${product.price} - £55.00` : `£${product.price}.00`}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onBuy(product)}
                className="flex-1 bg-teal-600 text-white text-xs py-1 rounded hover:bg-teal-700 transition"
              >
                Add
              </button>
              <button className="flex-1 bg-purple-600 text-white text-xs py-1 rounded hover:bg-purple-700 transition">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
