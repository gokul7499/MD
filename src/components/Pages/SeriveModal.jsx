import React from 'react';

const ServiceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const services = [
    {
      title: 'Fabrication work',
      icon: '🏠',
    },
    {
      title: 'Lights',
      icon: '🌵',
    },
  ];

  const handleCardClick = (title) => {
    alert(`You clicked on ${title}`);
    // you can route or open details here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Electronic work</h2>
          <button
            onClick={onClose}
            className="text-purple-500 text-2xl font-bold hover:text-purple-700"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(service.title)}
              className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-xl hover:bg-gray-200 cursor-pointer transition"
            >
              <div className="text-4xl mb-2">{service.icon}</div>
              <p className="font-medium">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
