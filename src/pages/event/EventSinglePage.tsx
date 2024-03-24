import { useParams } from "react-router-dom";
import {
  EventType,
  useGetEventQuery,
} from "../../features/events/eventAPISlice";
import { useEffect, useState } from "react";

const EventSinglePage = () => {
  const eventId = useParams().id;
  const { data, error, isLoading } = useGetEventQuery(eventId);
  const [event, setEvent] = useState<EventType>();

  //Fetching event data
  useEffect(() => {
    console.log("Event id:", eventId);
    if (error) return console.error("Error:", error);
    if (data) {
      console.log("Data fetched", data);
      setEvent(data);
    }
  }, [data, error, isLoading]);

  return data && !isLoading ? (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 pt-[100px] px-5 sm:px-10 md:px-20 lg:px-40 xl:60">
        <div>
          <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
            <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">
              {data.name}
            </h1>
            <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">
              {data.type}
            </p>
          </div>
          <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
            <dt className="sr-only">Reviews</dt>
            <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className="mr-1 stroke-current dark:stroke-indigo-500"
              >
                <path
                  d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                {data.rating}{" "}
                <span className="text-slate-400 font-normal">(128)</span>
              </span>
            </dd>
            <dt className="sr-only">Location</dt>
            <dd className="flex items-center">
              <svg
                width="2"
                height="2"
                aria-hidden="true"
                fill="currentColor"
                className="mx-3 text-slate-300"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              >
                <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              </svg>
              {data.address.city} , {data.address.country}
            </dd>
          </dl>
          <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
            <button
              type="button"
              className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
            >
              Check availability
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
            {data.long_description}
          </p>
        </div>
        <div className="grid gap-4">
          <img
            src="https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/01/29141004/beach-party-1.jpeg"
            className="w-full h-60 object-cover rounded-lg col-span-2"
            alt=""
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/06/23/04/49/beach-2433476_1280.jpg"
            className="w-full h-52 object-cover rounded-lg col-span-2 md:col-span-1"
            alt=""
          />
          <img
            src="https://t4.ftcdn.net/jpg/00/84/77/21/360_F_84772103_3rxkAwCu11YRuMegxeeczuiY5Dsp4Xiy.jpg"
            className="w-full h-52 object-cover rounded-lg col-span-1 md:col-span-1"
            alt=""
          />
        </div>
      </div>
    </>
  ) : null;
};

export default EventSinglePage;
