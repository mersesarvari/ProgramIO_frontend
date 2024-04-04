import EventCard from "../../components/event-components/EventCard";
import { useGetAllEventsQuery } from "../../app/api/eventApi";
import { useEffect } from "react";

const EventListPage = () => {
  const { data, isLoading, error } = useGetAllEventsQuery();
  useEffect(() => {
    if (data) console.log(data.length);
  }, [data, isLoading, error]);

  return !isLoading ? (
    <>
      <div className="grid grid-flow-row-dense gap-5 grid-cols-1 auto-rows-max xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 pt-40 xl:px-20 lg:px-10">
        {data &&
          data.map((item, index) => <EventCard eventItem={item} key={index} />)}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
  //Ez nem igazán frissül, de a szerver vissza adja a data-t elvileg. Valami async probléma van
};

export default EventListPage;
