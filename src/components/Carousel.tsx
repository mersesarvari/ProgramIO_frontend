import { useState } from "react";
import { Carousel as ReactCarausel } from "flowbite-react";

type CarouselProps = {
  imageURLS: string[];
};

const Carousel: React.FC<CarouselProps> = ({ imageURLS }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <ReactCarausel slide={false}>
      {imageURLS.map((url, index) => (
        <img src={url} alt="..." />
      ))}
    </ReactCarausel>
  );
};
export default Carousel;
