import React, { useEffect, useState } from "react";
import { storyData } from "../data";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";

const MainStoryGroup = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;

    if (selectedStory && isPlaying) {
      interval = setInterval(() => {
        setCurrentSlideIndex(
          (prevIndex) => (prevIndex + 1) % selectedStory.slides.length
        );
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [selectedStory, currentSlideIndex, isPlaying]);

  const openModal = (story) => {
    setSelectedStory(story);
    setCurrentSlideIndex(0);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setSelectedStory(null);
    setCurrentSlideIndex(0);
    setIsPlaying(true);
  };

  const goToNextSlide = () => {
    if (selectedStory) {
      setCurrentSlideIndex(
        (prevIndex) => (prevIndex + 1) % selectedStory.slides.length
      );
    }
  };

  const goToPrevSlide = () => {
    if (selectedStory) {
      setCurrentSlideIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedStory.slides.length) %
          selectedStory.slides.length
      );
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 p-4 md:p-8">
        {storyData[0].details.map((data) => (
          <div
            key={data.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => openModal(data)}
          >
            <img
              src={data.thumbnail}
              alt={data.name}
              className="w-32 h-32 object-cover rounded-full border-4"
              style={{ borderColor: data.ringColor }}
            />
            <p
              className="mt-4 text-center text-lg font-semibold"
              style={{ color: data.nameColor }}
            >
              {data.name}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-gray-800/70 flex justify-center items-center z-50">
          <div className="rounded-lg p-6 max-w-md w-full relative ">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="  absolute 
      top-2 right-2 text-white text-3xl font-bold z-50
      md:top-[-40px] md:right-[-40px] md:text-white md:text-2xl "
            >
              &times;
            </button>

            {/* Carousel */}
            {selectedStory.slides.length > 0 && (
              <div className="flex flex-col items-center justify-center relative mt-6">
                <div className="flex gap-1 px-2 pt-2 z-20 mb-2 w-[180px] mx-auto">
                  {selectedStory.slides.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-1 rounded-full ${
                        index <= currentSlideIndex ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="relative ">
                  {/* Slide Image */}
                  <img
                    src={selectedStory.slides[currentSlideIndex].image}
                    alt="Slide"
                    className="w-full h-70 object-contain rounded-xl shadow-lg"
                  />

                  {/* Left Arrow */}
                  <button
                    onClick={goToPrevSlide}
                    className="absolute top-1/2 left-0 -translate-y-1/2 px-1.5 py-3 bg-gray-800/70 text-white "
                  >
                    <FaChevronLeft />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={goToNextSlide}
                    className="absolute top-1/2 right-0 -translate-y-1/2 px-1.5 py-3 bg-gray-800/70 text-white "
                  >
                    <FaChevronRight />
                  </button>

                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlayPause}
                    className="absolute top-2 right-2 bg-gray-800/70 text-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full text-xs"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                </div>

                {/*  Slide Button */}
                {selectedStory.slides[currentSlideIndex].button_text && (
                  <a
                    href={selectedStory.slides[currentSlideIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block bg-gray-800/70 text-white  text-[12px] px-2.5 py-2 rounded border border-black hover:bg-black"
                  >
                    {selectedStory.slides[currentSlideIndex].button_text}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainStoryGroup;
