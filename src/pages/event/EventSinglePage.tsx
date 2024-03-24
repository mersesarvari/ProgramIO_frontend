import { useParams } from "react-router-dom";
import { useGetEventQuery } from "../../features/events/eventAPISlice";
import { useEffect } from "react";
import { Datepicker } from "flowbite-react";
import Footer from "../../components/navigation/Footer";
import RatingReact from "../../components/RatingReact";
import GoogleMapSingleMarker from "../../components/map/GoogleMapSingleMarker";

const EventSinglePage = () => {
  const eventId = useParams().id;
  const { data, error, isLoading } = useGetEventQuery(eventId);

  //Fetching event data
  useEffect(() => {
    console.log("Event id:", eventId);
    if (error) return console.error("Error:", error);
    if (data) {
      console.log("Data fetched", data);
    }
  }, [data, error, isLoading]);

  return data && !isLoading ? (
    <>
      <div className="container pt-20 relative xl:px-56 mx-auto bg-gray-100">
        {/* IMAGE GRID */}
        <div className="grid gap-3 grid-rows-2 grid-cols-4">
          <img
            src="https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/01/29141004/beach-party-1.jpeg"
            className="h-52 w-full object-cover rounded-lg col-span-4 sm:col-span-2 row-span-1 sm:row-span-2 sm:h-full"
            alt=""
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/06/23/04/49/beach-2433476_1280.jpg"
            className="h-52 w-full object-cover rounded-lg row-span-1 col-span-4 sm:col-span-2"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D"
            className="h-52 w-full object-cover rounded-lg row-span-1 col-span-4 sm:col-span-2"
            alt=""
          />
        </div>
        {/* Event details grid */}
        <div className="grid grid-cols-1 md:grid-cols-5  gap-4 pt-10">
          {/* Details column */}
          <div className="col-span-3">
            {/* Header datas */}
            <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
              <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-3xl dark:sm:text-white">
                {data.name}
              </h1>
              <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">
                {data.type}
              </p>
            </div>
            {/* Rating / Location */}
            <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
              <dt className="sr-only">Type</dt>
              <dt className="sr-only">Reviews</dt>
              <dd className="text-yellow-400 flex items-center dark:text-yellow-400">
                <RatingReact value={data.rating} name="" readonly={true} />
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
                  strokeWidth="2"
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
            {/* Button */}
            <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
              <button
                type="button"
                className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
              >
                Check availability
              </button>
            </div>
            {/* Long description */}
            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
              {data.long_description}
            </p>
            {/* Divider */}
            <div className="flex flex-col w-full">
              <hr className="w-full h-0.5 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700" />
            </div>
          </div>
          {/* Left information column */}
          <div className="col-span-2 pl-10">
            {/* Date Card */}
            <div className="card w-full bg-white text-primary-content border my-5">
              <div className="card-body">
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": 15 }}></span>
                    </span>
                    days
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": 10 }}></span>
                    </span>
                    hours
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": 24 }}></span>
                    </span>
                    min
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": 49 }}></span>
                    </span>
                    sec
                  </div>
                </div>
              </div>
            </div>
            {/* Payment card */}
            <div className="card w-full bg-white text-primary-content border">
              <div className="card-body">
                <h2 className="card-title font-bold">Buy your ticket</h2>
                <Datepicker disabled />
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn w-full my-5">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5">
            <GoogleMapSingleMarker
              width={"100%"}
              height={"500px"}
              defaultZoom={14}
              event={data}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : null;
};

export default EventSinglePage;
