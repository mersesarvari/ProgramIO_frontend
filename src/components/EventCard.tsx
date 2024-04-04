import { Rating } from "flowbite-react";
import { isWithinInterval, subDays, addDays } from "date-fns";
import AlertIcon from "./icons/AlertIcon";
import { useNavigate } from "react-router-dom";
import MiniImageSlide from "./MiniImageSlide";
import { useEffect, useState } from "react";
import { EventType } from "../app/api/eventApi";
import { useGetAllEventImagesQuery } from "../app/api/imageApi";
import MyCarcasuel from "./CustomImageSlide";

export interface EventCardProps {
  eventItem: EventType;
}

const isEventNew = (_eventDate) => {
  const eventDate = new Date(_eventDate);
  const fiveDaysAgo = subDays(new Date(), 5);
  if (
    isWithinInterval(eventDate, {
      start: fiveDaysAgo,
      end: addDays(new Date(), 5),
    })
  ) {
    return true;
  } else {
    return false;
  }
};

const EventCard: React.FC<EventCardProps> = ({ eventItem }) => {
  //Fetching event images
  const imageQuery = useGetAllEventImagesQuery(eventItem._id);
  const [isHovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${eventItem._id}`);
  };

  useEffect(() => {
    if (imageQuery.data) {
      console.log(imageQuery.data);
    }
  }, [imageQuery.data]);

  return imageQuery.data && !imageQuery.isLoading && eventItem ? (
    <div
      className="card-compact"
      style={{ position: "relative" }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={handleClick}
    >
      {/* NEW BADGE */}
      {isEventNew(eventItem.create_date) ? (
        <div
          className="badge badge-success gap-2"
          style={{
            zIndex: 500,
            position: "absolute",
            marginTop: "10px",
            marginLeft: "12px",
            fontWeight: "bold",
            color: "white",
            border: "1px solid white",
          }}
        >
          NEW
        </div>
      ) : null}

      <AlertIcon />
      <div className="h-60">
        <MyCarcasuel
          imageData={imageQuery.data.map((image) => image.imageData)}
          isHovered={isHovered}
        ></MyCarcasuel>
      </div>
      <div className="card-body items-left text-left px-0 py-0 mt-0">
        <h2 className="card-title items-center w-full font-bold text-gray-900 dark:text-white">
          {eventItem.name}
          <Rating className="">
            <Rating.Star />
            <p className="mx-1 text-sm font-bold text-gray-900 dark:text-white text-left items-center">
              {eventItem.rating.toString()}
            </p>
          </Rating>
        </h2>
        <p>Proba header</p>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
    </div>
  ) : null;
};

export default EventCard;
