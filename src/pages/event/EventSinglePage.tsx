import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Datepicker } from "flowbite-react";
import Footer from "../../components/navigation/Footer";
import RatingReact from "../../components/RatingReact";
import GoogleMapSingleMarker from "../../components/map/GoogleMapSingleMarker";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useGetEventQuery } from "../../app/api/eventApi";
import { useGetAllEventImagesQuery } from "../../app/api/imageApi";
import CustomImageSlide from "../../components/CustomImageSlide";
import HostPageElement from "../../components/event-components/HostPageElement";
import PaymentCard from "../../components/event-components/PaymentCard";
import Divider from "../../components/Divider";
import DateCard from "../../components/event-components/DateCard";
import HeaderImageCard from "../../components/event-components/HeaderImageCard";

const EventSinglePage = () => {
  const eventId = useParams().eventId;
  const { data, error, isLoading } = useGetEventQuery(eventId!);
  const imageQuery = useGetAllEventImagesQuery(eventId!);

  //Fetching event data
  useEffect(() => {
    console.log("Event id:", eventId);
    if (error) return console.error("Error:", error);
    if (data) {
      console.log("Data fetched", data);
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    console.log("Image:", imageQuery.data);
  }, [imageQuery.data]);

  return data && !isLoading && imageQuery.data ? (
    <>
      <div className="container pt-20 relative px-5 xl:px-32 mx-auto bg-gray-100">
        {/* IMAGE GRID */}
        <HeaderImageCard imageQuery={imageQuery} />
        <div className="col-span-4 row-span-1 w-full block md:hidden">
          <CustomImageSlide
            imageData={imageQuery.data.map((image) => image.imageData)}
            isHovered={true}
          />
        </div>

        {/* Event details grid */}
        <div className="grid grid-cols-5 gap-4 pt-10">
          {/* Details column */}
          <div className="col-span-5 md:col-span-3">
            {/* Header datas */}
            <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gray-100 sm:row-start-2 sm:p-0 lg:row-start-1">
              <h1 className="mt-1 text-lg font-semibold text-slate-900 md:text-3xl">
                {data.name}
              </h1>
              <p className="text-sm leading-4 font-mediumtext-slate-50">
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
            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400 break-words">
              {data.long_description}
            </p>
            {/* Divider */}
            <Divider />
            <HostPageElement />
            {/* Divider */}
            <Divider />
            {/* Statistics */}
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-primary">25.6K</div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Page Views</div>
                <div className="stat-value text-secondary">2.6M</div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-value">86%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">
                  31 tasks remaining
                </div>
              </div>
            </div>
          </div>
          {/* Left information column */}
          <div className="col-span-5 md:col-span-2">
            {/* Date Card */}
            <DateCard />
            {/* Payment card */}
            <PaymentCard />
          </div>
          {/* Google maps Row */}
          <div className="col-span-5">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
              <GoogleMapSingleMarker
                width={"100%"}
                height={"500px"}
                defaultZoom={14}
                markerPosition={data.address.coordinate}
              />
            </APIProvider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : null;
};

export default EventSinglePage;
