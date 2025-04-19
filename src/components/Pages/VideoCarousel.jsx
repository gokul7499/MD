import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const VideoCarousel = () => {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(300);
  const [containerWidth, setContainerWidth] = useState(0);

  const videos = [
    { src: "/img/vd1-Blp65JG-.mp4", title: t("titles.landscape") },
    { src: "/img/vd2-O70qnDQ-.mp4", title: t("titles.kitchen") },
    { src: "/img/vd3-DeCC50ly.mp4", title: t("titles.roofing") },
    { src: "/img/vd4-BUp2dX9H.mp4", title: t("titles.flooring") },
    { src: "/img/vd5-B0azAnJS.mp4", title: t("titles.pool") },
  ];

  const scrollToIndex = (index) => {
    const scrollPosition = index * (itemWidth + 16);
    scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
  };

  const scroll = (direction) => {
    const newIndex = direction === "left"
      ? Math.max(activeIndex - 1, 0)
      : Math.min(activeIndex + 1, videos.length - 1);
    scrollToIndex(newIndex);
  };

  const handleScroll = () => {
    const { scrollLeft } = scrollRef.current;
    const index = Math.round(scrollLeft / (itemWidth + 16));
    setActiveIndex(index);
  };

  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) setItemWidth(screenWidth - 32);
      else if (screenWidth < 768) setItemWidth(320);
      else if (screenWidth < 1024) setItemWidth(360);
      else setItemWidth(400);

      if (scrollRef.current) setContainerWidth(scrollRef.current.offsetWidth);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", handleScroll);
      return () => current.removeEventListener("scroll", handleScroll);
    }
  }, [itemWidth]);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        {t("Video Carousel")}
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className={`hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all duration-300 ${
            activeIndex === 0 ? "opacity-50 cursor-default" : "hover:shadow-xl"
          }`}
          disabled={activeIndex === 0}
          aria-label="Previous video"
          style={{
            left: `max(1rem, calc(50% - ${containerWidth / 2 + 20}px))`,
          }}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory px-4"
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-start transition-transform duration-300 hover:scale-[1.02]"
              style={{ width: `${itemWidth}px` }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <video
                  src={video.src}
                  className="w-full h-48 md:h-56 object-cover"
                  muted
                  controls
                  playsInline
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
                <div className="p-4">
                  <p className="text-lg font-semibold text-gray-800 text-center">
                    {video.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className={`hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all duration-300 ${
            activeIndex === videos.length - 1
              ? "opacity-50 cursor-default"
              : "hover:shadow-xl"
          }`}
          disabled={activeIndex === videos.length - 1}
          aria-label="Next video"
          style={{
            right: `max(1rem, calc(50% - ${containerWidth / 2 + 20}px))`,
          }}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-gray-800 scale-125"
                : "bg-gray-300"
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
