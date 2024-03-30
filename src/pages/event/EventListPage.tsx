import EventCard from "../../components/EventCard";
import { requestApi } from "../../app/api/api";
import { effect } from "@preact/signals-react";

const renderCards = (data: any[]) => {
  console.log("Card data", data);
  return data.map((item, index) => <EventCard eventItem={item} key={index} />);
};

const EventListPage = () => {
  const { data, error, isLoading } = requestApi({
    method: "GET",
    url: "http://localhost:5000/event",
  });

  effect(() => {
    if (data.value && !error.value && !isLoading.value) {
      console.log("Events loaded:", data.value);
      console.log("IsLoading:", isLoading.value);
    }
  });

  return data.value ? (
    <div className="grid grid-flow-row-dense gap-5 grid-cols-1 auto-rows-max xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 pt-40 xl:px-20 lg:px-10">
      {renderCards(data.value)}
    </div>
  ) : (
    <div className="pt-40">Loading</div>
  );
};

export default EventListPage;
