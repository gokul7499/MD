import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Star, Trash2 } from 'lucide-react';

const services = [
  {
    title: '55 Plus Housing',
    rating: 4.85,
    reviews: '1.9M',
    description: [
      'The 55+ niche is vitally important to help ease the transitions between life stages.',
     
    ]
  },
  {
    title: 'Concrete Building',
    rating: 4.86,
    reviews: '2.2M',
    description: [
      'Concrete has been an essential home building material for the past century. Learn more about the benefits of this popular material.'
    ]
  },
  {
    title: 'Custom Homes',
    rating: 4.86,
    reviews: '2.2M',
    description: [
      'Custom builders create homes designed for each owner individually or from their own, private stock of designs.'
    ]
  },
  {
    title: 'Log homes',
    rating: 4.86,
    reviews: '2.2M',
    description: [
      'Log and timber homes are a healthier, organic, sustainable and environmentally friendly option.',
    
    ]
  }
];

const ServiceCarousel = () => {
  const [addedServices, setAddedServices] = useState([]);

  const handleAddService = (service) => {
    if (!addedServices.some(s => s.title === service.title)) {
      setAddedServices([...addedServices, service]);
    }
  };

  const handleRemoveService = (serviceTitle) => {
    setAddedServices(addedServices.filter(service => service.title !== serviceTitle));
  };

  const handleWhatsAppShare = () => {
    const phoneNumber = '919999999999'; // Replace with actual number
    const message = `I'm interested in these services:\n\n${addedServices.map(service => `• ${service.title}`).join('\n')}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-rose-800 mb-6">
        Choose the services you want
      </h2>
      
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 30 }
        }}
        modules={[Pagination]}
        className="mb-8 swiper-container"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 h-full mx-2" style={{ minHeight: '320px' }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-green-600 font-bold text-sm">SERVICE</span>
                <button 
                  onClick={() => handleAddService(service)}
                  className="text-purple-600 border border-purple-200 px-3 py-1 rounded-md text-sm hover:bg-purple-50 transition"
                >
                  Add
                </button>
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <div className="flex items-center text-sm text-gray-700 mb-3">
                <Star size={14} className="text-yellow-500 mr-1" />
                {service.rating} &nbsp;
                <span className="text-gray-500">({service.reviews} reviews)</span>
              </div>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                {service.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Added Services Section */}
      {addedServices.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Added Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addedServices.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition">
                <div>
                  <h4 className="font-medium">{service.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Star size={12} className="text-yellow-500 mr-1" />
                    {service.rating} ({service.reviews})
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveService(service.title)}
                  className="text-red-500 hover:text-red-700 transition"
                  aria-label={`Remove ${service.title}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={handleWhatsAppShare}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto text-center transition flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.588c.545 1.422 1.666 2.595 3.102 3.191.21.086.386.131.537.131.227 0 .396-.05.512-.089.302-.104.828-.357 1.447-1.195.39-.526.683-1.05.855-1.552.198-.57.09-1.056-.04-1.205-.14-.158-.397-.213-.597-.232-.17-.018-.366-.039-.59.06-.45.198-1.187.674-1.772.99-.08.043-.145.063-.198.063-.158 0-.396-.1-.686-.297-.297-.198-.575-.434-.853-.644-.742-.552-1.244-1.156-1.47-1.578-.119-.22-.095-.34-.026-.44.087-.14.26-.347.39-.496.128-.148.17-.223.26-.372.089-.149.045-.279-.02-.397-.062-.119-.557-1.345-.762-1.84-.198-.48-.397-.397-.557-.397-.148 0-.318.008-.486.008-.248.018-.595.074-.89.372-.297.297-1.128 1.09-1.128 2.64 0 1.55 1.17 3.119 1.33 3.319z"/>
                <path d="M12 22.75c-5.937 0-10.75-4.812-10.75-10.75S6.063 1.25 12 1.25c2.468 0 4.788.845 6.652 2.396.535.453.78 1.18.644 1.883l-.396 1.984c-.156.781.388 1.515 1.165 1.515.842 0 1.734.81 1.734 1.64v2.94c0 .829-.892 1.64-1.734 1.64h-2.07c-.64 0-1.28.5-1.28 1.28v3.17c0 .78-.64 1.28-1.28 1.28H12zm0-20c-5.108 0-9.25 4.142-9.25 9.25s4.142 9.25 9.25 9.25h4.73c.152 0 .28-.13.28-.28v-3.17c0-1.034.84-1.88 1.87-1.88h2.07c.152 0 .28-.13.28-.28v-2.94c0-.15-.128-.28-.28-.28h-2.07c-1.03 0-1.87-.846-1.87-1.88l.4-2c.06-.29-.02-.59-.216-.81A9.213 9.213 0 0012 2.75z"/>
              </svg>
              Send Services to MD Developers Via WhatsApp Now
            </button>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Save 10% on every order</p>
              <div className="flex gap-2 mt-2">
                <button className="text-purple-600 border border-purple-200 px-3 py-1 rounded-md text-sm hover:bg-purple-50 transition">
                  Get Plus now
                </button>
                <button className="text-blue-600 border border-blue-200 px-3 py-1 rounded-md text-sm hover:bg-blue-50 transition">
                  View More Offers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add this to your global CSS or style tag */}
      <style jsx global>{`
        .swiper-container {
          padding-bottom: 30px;
        }
        .swiper-pagination {
          bottom: 0px !important;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #9CA3AF;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #E11D48;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ServiceCarousel;