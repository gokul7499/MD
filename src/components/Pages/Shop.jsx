import React from 'react';
const products = [
  {
    id: 1,
    name: 'Pinners',
    category: 'Hoodies',
    price: 15,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ6dEIuIob7q6p0tkHLJqcT1WKNw25l4dojlQsFhCZovcINLZorDKRV82zGHV7FibBKpgp14b5mdogaOm1xBPFBV60yuy7kyHoUYU4d7GPZPbWyGV9dGSwzCt8',
  },
  {
    id: 2,
    name: 'Woo Logo',
    category: 'Hoodies',
    price: 12,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ6N9QnV5CoqPjK99rWY0rChmkQSkopV3EdQcdL45pzviwlHBBF3nhMWy1lCl_Ke-8x0h0PlNPz-ZLBTSbmf9-ti7WFALzLkHUQGRUFJJMuGrqBBCpw11Ua',
  },
  {
    id: 3,
    name: 'Phawada',
    category: 'Clothing',
    price: 35,
    image: 'https://rukminim3.flixcart.com/image/850/1000/k3dc7m80/shovel-spade/9/h/x/garden-spade-shovel-fawda-with-wooden-handle-heavy-duty-original-imafmgu6uzc5shrz.jpeg?q=20&crop=false',
    sale: true,
  },
  {
    id: 4,
    name: 'Cap',
    category: 'Clothing',
    price: 35,
    image: 'https://www.shutterstock.com/image-illustration/yellow-safety-helmet-hard-cap-600nw-2130027554.jpg',
  },
  {
    id: 5,
    name: 'Construction Shoes',
    category: 'Clothing',
    price: 30,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqldr4qsjTKrGHSx0xiTLHIgbuNwXPSpvgw&s',
    priceRange: true,
    sale: true,
  },
  {
    id: 6,
    name: 'Construction jacket',
    category: 'Hoodies',
    price: 15,
    image: 'https://image.made-in-china.com/202f0j00suzoPbwJfrgk/Custom-High-Visibility-Durable-Breathable-Polyester-Winter-Construction-Workwear-Reflective-Safety-Jacket.webp',
  },
  {
    id: 7,
    name: 'Tile',
    category: 'Hoodies',
    price: 15,
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/kitchen-wall-tiles-for-wall-tiles-used-in-kitchens-2024858520-jlz238wl.gif',
  },
  {
    id: 8,
    name: 'Paint',
    category: 'Hoodies',
    price: 15,
    image: 'https://media.fortuneindia.com/fortune-india/import/2022-03/9716a381-eb1f-48f0-8052-a7acb4fb0716/paint.jpg?w=640&auto=format,compress&fit=max&q=70',
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
