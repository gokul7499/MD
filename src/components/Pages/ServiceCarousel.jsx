import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ServiceCarousel = () => {
  const { t } = useTranslation();

  const services = [
    { title: t("services.0.title"), image: "/img/buildingp.jpg" },
    { title: t("services.1.title"), image: "/img/fitting.png" },
    { title: t("services.2.title"), image: "/img/Plumbing.png" },
    { title: t("services.3.title"), image: "/img/ACService.png" },
  ];

  return (
    <div className="py-10 px-4 sm:px-7 bg-white max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex flex-wrap justify-center gap-6 text-gray-800 text-lg font-medium">
          <span className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            {t("rating")}
          </span>
          <span className="flex items-center gap-2">
            <FaUsers className="text-blue-500" />
            {t("customers")}
          </span>
        </div>
      </div>

      {/* Swiper Carousel */}
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
                  {t("bookNow")}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Force Swiper arrows to white */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 22px;
        }
      `}</style>
    </div>
  );
};

export default ServiceCarousel;
