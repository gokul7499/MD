import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaUsers } from "react-icons/fa";

const services = [
  {
    title: "Interior House Decorator",
    image:
      "/img/gavatdesing.png",
  },
  {
    title: "Light Fitting",
    image:
      "/img/working.png",
  },
  {
    title: "Plumbing",
    image:
      "/img/Plumbing.png",
  },
  {
    title: "AC Installation",
    image:
      "/img/ACService.png",
  },
];

const ServiceCarousel = () => {
  return (
    <div className="py-10 px-4 sm:px-7 bg-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex flex-wrap justify-center gap-6 text-gray-800 text-lg font-medium">
          <span className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            4.8 Service Rating
          </span>
          <span className="flex items-center gap-2">
            <FaUsers className="text-blue-500" />
            12M+ Customers
          </span>
        </div>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="overflow-visible"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-xl overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-lg font-semibold drop-shadow-md">
                  {service.title}
                </h3>
                <button className="mt-2 px-4 py-1 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition">
                  Book now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiceCarousel;