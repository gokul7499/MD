import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

const ApplianceRepairCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="py-10 px-4 md:px-10 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        AC & Appliance Repair
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
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
          }}
          className="pb-12"
        >
          {applianceServices.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 h-full">
                <img
                  src={item.image}
                  alt={item.title || 'Service Image'}
                  className="h-52 w-full object-cover"
                />
                <div className="py-4 px-2 text-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Prev Button */}
          <button
            ref={prevRef}
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronLeft />
          </button>

          {/* Custom Next Button */}
          <button
            ref={nextRef}
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronRight />
          </button>
        </Swiper>

        {/* Custom Pagination Dots Below */}
        <div className="custom-swiper-pagination mt-6 flex justify-center space-x-2" />
      </div>
    </div>
  );
};

export default ApplianceRepairCarousel;
