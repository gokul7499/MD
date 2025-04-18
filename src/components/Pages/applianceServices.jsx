import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ApplianceRepairCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const applianceServices = [
    {
      title: 'Washing Machine Repair',
      image: 'https://themddevelopers.com/assets/washing-BUN-dRZE.jpeg',
    },
    {
      title: 'AC Repair & Service',
      image: 'https://themddevelopers.com/assets/ACReapi-BsdsE7OV.jpg',
    },
    {
      title: 'Water Purifier Repair',
      image: 'https://themddevelopers.com/assets/Top-Notch%20RO%20Services%20in%20Bareilly_%20Ensuring%20Clean%20and%20Safe%20Drinking%20Water-B_IYJhJ2.jpeg',
    },
    {
      title: 'Television Repair',
      image: 'https://themddevelopers.com/assets/Refrigerator%20Repair%20Near%20Me-0CnEIiUK.jpeg',
    },
    {
      title: 'Refrigerator Repair',
      image: 'https://themddevelopers.com/assets/Freezer%20_%20Microwave%20Repair-C0krbpW8.jpeg',
    },
    {
      title: 'Microwave Oven Repair',
      image: 'https://themddevelopers.com/assets/chimney%20service%20in%20dehradun-DSaGdDdk.jpeg',
    },
    {
      title: 'Air Purifier Serivece',
      image: 'https://themddevelopers.com/assets/K%C3%A4rcher%20-%20Air%20purifier%20AF%2020-LVNqxA-8.jpeg',
    },
  ];

  return (
    <motion.div
      className="py-9 px-4 md:px-12 bg-white text-center"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        AC & Appliance Repair
      </motion.h2>

      <div className="relative h-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
          }}
          onSwiper={setSwiperInstance}
          className="pb-12"
        >
          {applianceServices.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 h-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="py-4 px-2 text-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Prev Button */}
        <button
          ref={prevRef}
          aria-label="Previous Slide"
          className="hidden sm:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
        >
          <ChevronLeft />
        </button>

        {/* Custom Next Button */}
        <button
          ref={nextRef}
          aria-label="Next Slide"
          className="hidden sm:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
        >
          <ChevronRight />
        </button>

        {/* Custom Pagination Dots */}
        <div className="custom-swiper-pagination mt-6 flex justify-center space-x-2" />
      </div>
    </motion.div>
  );
};

export default ApplianceRepairCarousel;
