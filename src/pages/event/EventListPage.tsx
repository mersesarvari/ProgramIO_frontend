import EventCard from "../../components/EventCard";
import { useApi } from "../../app/api/api";
import { effect, signal } from "@preact/signals-react";
import { useState } from "react";

const renderCards = (events) => {
  console.log("renderCards called");
  console.log("Card data", events.value);

  return events.value.map((item, index) => (
    <EventCard eventItem={item} key={index} />
  ));
};

const EventListPage = () => {
  const { data, error, isLoading } = useApi({
    method: "GET",
    url: "http://localhost:5000/event",
  });

  effect(() => {
    console.log("IsLoaDING:", data);
    return isLoading === false ? (
      <div className="grid grid-flow-row-dense gap-5 grid-cols-1 auto-rows-max xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 pt-40 xl:px-20 lg:px-10">
        {renderCards(data)}
      </div>
    ) : (
      <div className="pt-40">Loading</div>
    );
  });
  //Ez nem igazán frissül, de a szerver vissza adja a data-t elvileg. Valami async probléma van
};

export default EventListPage;
