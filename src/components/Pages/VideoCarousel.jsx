import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    src: "/img/vd1-Blp65JG-.mp4",
    title: "Landscape Designing",
  },
  {
    src: "/img/vd2-O70qnDQ-.mp4",
    title: "Modular Kitchens",
  },
  {
    src: "/img/vd3-DeCC50ly.mp4",
    title: "Roofing Solutions",
  },
  {
    src: "/img/vd4-BUp2dX9H.mp4",
    title: "Flooring Services",
  },
  
  {
    src: "/img/vd5-B0azAnJS.mp4",
    title: "Swimming Pools",
  },
  
];

const VideoCarousel = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / offsetWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        New And Noteworthy
      </h2>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
        >
          <ChevronLeft />
        </button>

        {/* Videos */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-4 sm:px-6 no-scrollbar"
        >
          {videos.map((video, index) => (
            <div key={index} className="flex-shrink-0 w-64 sm:w-72">
              <div className="rounded-xl overflow-hidden shadow-md">
                <video
                  src={video.src}
                  className="w-full h-48 object-cover"
                  muted
                  controls
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
              </div>
              <p className="text-center font-medium mt-2">{video.title}</p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {videos.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition ${
              index === activeIndex ? "bg-black" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;