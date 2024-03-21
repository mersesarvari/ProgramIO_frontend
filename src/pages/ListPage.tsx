import EventCard from "../components/EventCard";

const renderCards = (data: any[]) => {
  return data.map((item, index) => (
    <div className="basis-1/4">
      <EventCard />
    </div>
  ));
};

const ListPage = () => {
  return (
    <div className="grid grid-flow-row-dense grid-cols-4 auto-rows-max mx-20 pt-40">
      {renderCards([
        "a",
        "b",
        "c",
        "d",
        "e",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
      ])}
    </div>
  );
};

export default ListPage;
