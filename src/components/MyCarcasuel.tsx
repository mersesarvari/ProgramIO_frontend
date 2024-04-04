import { useState } from "react";

type MyCarcasuelProps = {
  imageData?: string[];
};

const MyCarcasuel: React.FC<MyCarcasuelProps> = ({
  imageData = [
    "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-with-dew-drops_753134-644.jpg",
    "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg",
  ],
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

  console.log("ImageData:", imageData);
  return imageData ? (
    <div
      id="indicators-carousel"
      className="relative w-full bg-black"
      data-carousel="static"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <>
          {imageData &&
            imageData.map((image, index) => (
              <div
                className={`${
                  index === activeIndex ? "" : "hidden"
                } duration-700 ease-in-out`}
                data-carousel-item={index === activeIndex ? "active" : ""}
              >
                <img
                  src={image}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
            ))}
        </>
      </div>
      {/* Bottom controllers */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {imageData.map((image, index) => (
          <button
            type="button"
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-red-400" : " bg-white"
            } shadow-sm`}
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
      {/* Right controller */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={() => setPreviousActive()}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      {/* Left controller */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={() => setNextActive()}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  ) : null;
};

export default MyCarcasuel;
