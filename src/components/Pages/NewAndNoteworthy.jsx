import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const data = [
  { title: 'Landscape Designing', img: '/img/landscpedesing.png' },
  { title: 'Modular Kitchens', img: '/img/kichen.png' },
  { title: 'Roofing Solutions', img: '/img/styleimg.png' },
  { title: 'Flooring Services', img: '/img/flooringse.png' },
  { title: 'Swimming Pools', img: '/img/containers.png' },
];

const NewAndNoteworthy = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="py-10 px-4 md:px-10 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        New And Noteworthy
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // Re-assign navigation elements after Swiper has initialized
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          pagination={{ clickable: true }}
          className="pb-8"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <div className="py-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Prev Button */}
          <button
            ref={prevRef}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronLeft />
          </button>

          {/* Custom Next Button */}
          <button
            ref={nextRef}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronRight />
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default NewAndNoteworthy;