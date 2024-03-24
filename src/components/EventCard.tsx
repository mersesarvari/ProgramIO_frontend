import { Rating } from "flowbite-react";
import { isWithinInterval, subDays, addDays } from "date-fns";
import AlertIcon from "./icons/AlertIcon";
import { useNavigate } from "react-router-dom";
import { EventType } from "../features/events/eventAPISlice";
import MiniImageSlide from "./MiniImageSlide";
import { useState } from "react";

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
  const [isHovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/event/${eventItem._id}`);
  };
  return (
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
            zIndex: 1000,
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
        <MiniImageSlide
          handleClick={() => {
            navigate(`/event/${eventItem._id}`);
          }}
          isHovered={isHovered}
          setHovered={setHovered}
          imageURLS={[
            "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg",
          ]}
        />
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
  );
};

export default EventCard;
