import { useEffect } from "react";
import EventCard from "../../components/EventCard";
import { useGetEventsByUserQuery } from "../../features/events/eventAPISlice";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const renderCards = (data: any[]) => {
  return data.map((item, index) => (
    <div>
      <span>{item.name}</span>
      <Link to={`/event/${item._id}/editor`}>
        <Button>Edit</Button>
      </Link>
    </div>
  ));
};

const EventManagerPage = () => {
  const { data, error, isLoading } = useGetEventsByUserQuery();

  useEffect(() => {
    if (error) return console.log("Error:", error);
    if (data) {
      console.log("Events loaded:", data);
    }
  }, [data, error]);

  return data && !isLoading ? (
    <div className="grid grid-flow-row-dense gap-5 grid-cols-1 auto-rows-max xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 pt-40 xl:px-20 lg:px-10">
      {renderCards(data)}
    </div>
  ) : null;
};

export default EventManagerPage;
