import { useState } from "react";

type CustomImageSlideProps = {
  imageData?: string[];
  className?: string;
  isHovered: boolean;
};

const CustomImageSlide: React.FC<CustomImageSlideProps> = ({
  imageData,
  isHovered,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const setNextActive = () => {
    if (activeIndex < imageData.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const setPreviousActive = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(imageData.length - 1);
    }
  };

  const handleNextClick = (event: Event) => {
    event.stopPropagation();
    setNextActive();
  };

  const handlePreviousClick = (event: Event) => {
    event.stopPropagation();
    setPreviousActive();
  };

  return imageData ? (
    <div
      id="indicators-carousel"
      className="relative min-w-80 w-full h-full"
      data-carousel="static"
    >
      <div className="relative overflow-hidden rounded-lg h-64">
        {imageData?.map((image, index) => (
          <div
            className={`${
              index === activeIndex ? "" : "hidden"
            } duration-700 ease-in-out`}
            key={`ImageSlide-${index}`}
            data-carousel-item={index === activeIndex ? "active" : ""}
          >
            <img
              src={`data:image/webp;base64,${image}`}
              className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
              alt={`Image-${index}`}
              key={`Image-${index}`}
            />
          </div>
        ))}
      </div>
      {/* Bottom controllers */}
      <div className="absolute z-30 flex justify-center left-0 right-0 mx-auto bottom-0">
        {imageData.map((_, index) => (
          <button
            key={`SlideButton-${index}`}
            type="button"
            className={`size-2 rounded-full ${
              activeIndex === index ? "bg-white" : "bg-gray-400"
            } shadow-sm mx-1`}
            aria-current="true"
            aria-label={`Slide ${index}`}
            data-carousel-slide-to={index}
          />
        ))}
      </div>

      {/* Left controller */}
      <button
        type="button"
        className={`absolute top-0 start-0 z-30 flex items-center justify-center h-full 
        px-4 cursor-pointer group ${isHovered ? "" : "hidden"}`}
        data-carousel-prev
        onClick={handlePreviousClick}
      >
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full
         bg-white/90 group-focus-bg-red-400 hover:bg-white hover:scale-110"
        >
          <svg
            className="w-4 h-4 text-black rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      {/* Right controller */}
      <button
        type="button"
        className={`absolute top-0 end-0 z-30 flex items-center justify-center 
        h-full px-4 cursor-pointer ${isHovered ? "" : "hidden"}`}
        data-carousel-next
        onClick={handleNextClick}
      >
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full
         bg-white/90 group-focus-bg-red-400 hover:bg-white hover:scale-110"
        >
          <svg
            className="w-4 h-4 text-black rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  ) : null;
};

export default CustomImageSlide;
