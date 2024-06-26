import { Carousel as ReactCarausel } from "flowbite-react";

type CarouselProps = {
  imageURLS?: string[];
  imageData?: [];
  isHovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick?: () => void;
};

const MiniImageSlide: React.FC<CarouselProps> = ({
  imageURLS,
  isHovered,
  imageData,
}) => {
  const images = imageData?.map((x) => x.imageData);
  console.log("Images:", images);

  const carouselMiniTheme = {
    root: {
      base: "relative h-full w-full rounded-md",
      leftControl:
        "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-white dark:bg-gray-800",
      },
      base: `h-1 w-1 rounded-full `,
      wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
    },
    item: {
      base: "absolute left-1/2 top-1/2 block w-full h-full -translate-x-1/2 -translate-y-1/2",
      wrapper: {
        off: "w-full flex-shrink-0 transform cursor-default snap-center",
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
      },
    },
    //Right and left buttons
    control: {
      base: `inline-flex ${
        isHovered ? "base" : "hidden"
      } h-10 w-10 items-center 
      justify-center rounded-full bg-white/30 group-hover:bg-white/50 
      group-focus:outline-none group-focus:ring-4 group-focus:ring-white 
      dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 
      dark:group-focus:ring-gray-800/70 sm:h-50 sm:w-50 z-500`,
      icon: "h-10 w-10 text-white dark:text-gray-800 sm:h-6 sm:w-6",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-xl",
      snap: "snap-x",
    },
  };

  return imageURLS || imageData ? (
    <>
      {imageData ? (
        <ReactCarausel slide={false} theme={carouselMiniTheme} leftControl>
          {images &&
            images.map((data, index) => (
              <img src={`data:image/webp;base64,${data}`} alt="" key={index} />
            ))}
        </ReactCarausel>
      ) : null}
      {imageURLS ? (
        <ReactCarausel slide={false} theme={carouselMiniTheme}>
          {images &&
            images.map((data, index) => (
              <img src={`data:image/webp;base64,${data}`} alt="" key={index} />
            ))}
        </ReactCarausel>
      ) : null}
    </>
  ) : null;
};
export default MiniImageSlide;
