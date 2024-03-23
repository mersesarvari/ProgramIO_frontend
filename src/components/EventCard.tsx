import { Rating } from "flowbite-react";
import { isWithinInterval, subDays, addDays } from "date-fns";
import AlertIcon from "./icons/AlertIcon";
import { useNavigate } from "react-router-dom";
import { EventType } from "../features/events/eventAPISlice";

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
  const navigate = useNavigate();
  return (
    <div
      className="card-compact w-90 px-8 sm:px-2 xl:px-4"
      style={{ position: "relative" }}
      onClick={() => {
        console.log(`Navigating to: /home/${eventItem._id}`);
        navigate(`/event/${eventItem._id}`);
      }}
    >
      <figure className="pt-10 h-200">
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
        <img
          src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-left text-left">
        <div className="px-0 py-0 mt-0">
          <h2 className="card-title">
            <div className="items-center w-full font-bold text-gray-900 dark:text-white">
              {eventItem.name}
            </div>
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
    </div>
  );
};

export default EventCard;
