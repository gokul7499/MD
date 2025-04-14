import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';

const services = [
  {
    title: '55 Plus Housing',
    rating: 4.85,
    reviews: '1.9M',
    description: [
      'The 55+ niche is vitally important to help ease the transitions between life stages.',
      'Builders are redefining what it means to relocate with age by providing more lifestyle options for the growing 55+ population.'
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
      'Owners of log and timber homes report that coming home feels like going on vacation.'
    ]
  }
];

const ServiceCarousel = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-semibold text-center text-rose-800 mb-6">
        Choose the services you want
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        modules={[Pagination]}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 h-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-600 font-bold">SERVICE</span>
                <button className="text-purple-600 border border-purple-200 px-3 py-1 rounded-md text-sm hover:bg-purple-50">
                  Add
                </button>
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <div className="flex items-center text-sm text-gray-700 mt-1 mb-2">
                <Star size={14} className="text-yellow-500 mr-1" />
                {service.rating} &nbsp;
                <span className="text-gray-500">({service.reviews} reviews)</span>
              </div>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {service.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiceCarousel;
