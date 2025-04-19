import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const NewAndNoteworthy = () => {
  const { t } = useTranslation();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const data = [
    { title: t('newAndNoteworthy.landscape'), img: '/img/before.jpg' },
    { title: t('newAndNoteworthy.kitchen'), img: '/img/kichen.png' },
    { title: t('newAndNoteworthy.roofing'), img: '/img/styleimg.png' },
    { title: t('newAndNoteworthy.flooring'), img: '/img/flooringse.png' },
    { title: t('newAndNoteworthy.pool'), img: '/img/nightwater.jpg' },
  ];

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <div className="py-10 px-4 md:px-12 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        {t('newAndNoteworthy.title')}
      </h2>

      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) =>
              `<span class="${className} !bg-gray-400 !w-2 !h-2 !mx-1 rounded-full"></span>`,
          }}
          className="pb-12"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden mx-1 sm:mx-2 hover:shadow-lg transition-shadow duration-300">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="py-4 px-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="hidden sm:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 shadow-md border border-gray-400 rounded-full p-3 hover:bg-gray-300 transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          ref={nextRef}
          className="hidden sm:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 shadow-md border border-gray-400 rounded-full p-3 hover:bg-gray-300 transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default NewAndNoteworthy;
