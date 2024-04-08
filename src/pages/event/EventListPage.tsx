import EventCard from "../../components/event-components/EventCard";
import { useGetAllEventsQuery } from "../../app/api/eventApi";
import { useEffect, useState } from "react";
import SearchBarMenu from "../../components/navigation/searchbar/SearchBarMenu";
import { useSelector } from "react-redux";
import SearchBar from "../../components/navigation/searchbar/SearchBar";
import SearchBarHome from "../../components/navigation/searchbar/SearchBarHome";

const EventListPage = () => {
  const [openedIndex, setOpenedIndex] = useState<number>(null);
  const { data, isLoading, error } = useGetAllEventsQuery();
  const addressRedux = useSelector((state) => state.address.address);

  console.log("AddressRedux", addressRedux);

  useEffect(() => {
    if (data) console.log(data.length);
  }, [data, isLoading, error]);

  useEffect(() => {
    console.log("Address:", addressRedux);
  }, [addressRedux]);

  return !isLoading ? (
    <>
      <div className="flex pt-16 bg-gray-50 h-84 w-full border-b-2 border-gray-200 items-center justify-center text-center">
        <SearchBarHome
          setOpenedIndex={setOpenedIndex}
          openedIndex={openedIndex}
        >
          <SearchBarMenu
            isOpened={openedIndex === null ? false : true}
          ></SearchBarMenu>
        </SearchBarHome>
      </div>
      <div className="grid grid-flow-row-dense gap-5 grid-cols-1 auto-rows-max xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 pt-20 xl:px-20 lg:px-10">
        {data &&
          data.map((item, index) => <EventCard eventItem={item} key={index} />)}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default EventListPage;
