import ImageSlide from "../../components/ImageSlide";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Datepicker, FileInput, Label } from "flowbite-react";
import Footer from "../../components/navigation/Footer";
import RatingReact from "../../components/RatingReact";
import GoogleMapSingleMarker from "../../components/map/GoogleMapSingleMarker";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useGetEventQuery } from "../../app/api/eventApi";
import {
  useAddImageMutation,
  useDeleteImageMutation,
  useGetAllEventImagesQuery,
} from "../../app/api/imageApi";

const EventEditor = () => {
  const eventId = useParams().eventId;
  const eventQuery = useGetEventQuery(eventId);
  const { mutateAsync: addImage } = useAddImageMutation();
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const imageQuery = useGetAllEventImagesQuery(eventId);
  const fileInputRef = useRef(null);

  //Fetching event data
  useEffect(() => {
    console.log("Event id:", eventId);
    if (eventQuery.error) return console.error("Error:", error);
    if (eventQuery.data) {
      console.log("Data fetched", eventQuery.data);
    }
  }, [eventQuery.data, eventQuery.error, eventQuery.isLoading, eventId]);

  //Getting images:
  useEffect(() => {
    console.log("Image useEffect called.");
    console.log("Event id:", eventId);
    if (imageQuery.error) return console.error("Error:", error);
    if (imageQuery.data) {
      console.log("Image data fetched", imageQuery.data);
    }
  }, [imageQuery.data, imageQuery.error, imageQuery.isLoading, eventId]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the first file from the selected files

    // Check if a file was selected
    if (file) {
      const reader = new FileReader();
      const maxSizeInBytes = 3145728; // 3MB
      if (file.size > maxSizeInBytes) {
        toast.error("File size exceeds the maximum allowed size (3MB)");
        return;
      }

      // Check file extension
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error(
          "Invalid file extension. Allowed extensions: jpg, jpeg, png"
        );
        return;
      }

      reader.onload = async () => {
        // Append the new preview to the list of previews
        if (imageQuery.data.length >= 10) {
          console.error("You cannot upload more than 10 images");
          toast.error("You cannot upload more than 10 images");
          return;
        }
        //TODO: cannot let the user upload the same file twice
        //Upload file to the server.
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", eventId);
        //const uploadImageResponse = uploadEventImage(formData);
        const eventObject = {
          eventId: eventId,
          eventData: formData,
        };
        await addImage(eventObject);
      };
      // Read the file as a data URL
      reader.readAsDataURL(file);
      fileInputRef.current.value = null;
    }
  };

  const removeImage = async (imageName: string) => {
    //TODO
    console.log("Image:", imageName);
    const deleteImageObject: any = { imageName, eventId };
    await deleteImage(deleteImageObject);
  };

  return eventQuery.data && !eventQuery.isLoading ? (
    <>
      <Formik
        initialValues={eventQuery.data}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <div className="container pt-20 relative xl:px-56 mx-auto bg-gray-100">
            {/* IMAGE GRID */}
            {imageQuery.data && !imageQuery.isLoading ? (
              <div className="grid gap-3 grid-rows-2 grid-cols-4">
                <img
                  src={`data:image/webp;base64,${imageQuery?.data[0]?.imageData}`}
                  className="h-52 w-full object-cover rounded-lg col-span-4 sm:col-span-2 row-span-1 sm:row-span-2 sm:h-full hidden md:block"
                  alt=""
                />
                <img
                  src={`data:image/webp;base64,${imageQuery?.data[1]?.imageData}`}
                  className="h-52 w-full object-cover rounded-lg row-span-1 col-span-4 sm:col-span-2 hidden md:block"
                  alt=""
                />
                <img
                  src={`data:image/webp;base64,${imageQuery?.data[2]?.imageData}`}
                  className="h-52 w-full object-cover rounded-lg row-span-1 col-span-4 sm:col-span-2 hidden md:block"
                  alt=""
                />
                <div className="col-span-4 row-span-2 h-72 w-full block md:hidden">
                  <ImageSlide
                    imageURLS={[
                      "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/01/29141004/beach-party-1.jpeg",
                      "https://cdn.pixabay.com/photo/2017/06/23/04/49/beach-2433476_1280.jpg",
                      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D",
                    ]}
                  />
                </div>
              </div>
            ) : null}
            {/* Image upload */}
            <span>Upload your images</span>
            <div className="grid gap-1 grid-rows-2 grid-cols-6">
              {imageQuery.data && !imageQuery.isLoading ? (
                <>
                  {/* Rendering image list contitionally */}
                  {imageQuery.data.map((imageObject, index) => (
                    <div
                      className="flex w-full items-center justify-center col-span-1 row-span-1"
                      key={`uploaded-copontainer-${index}`}
                    >
                      {/* Display previews of uploaded images */}
                      <TrashIcon
                        className="z-500 text-red-800 w-8 h-8 bg-black bg-opacity-80 rounded-lg absolute"
                        key={`trash-icon-${index}`}
                        onClick={() => {
                          //TODO: image removement
                          removeImage(imageObject.name);
                        }}
                      />
                      <div key={index}>
                        <img
                          key={index}
                          src={`data:image/webp;base64,${imageObject.imageData}`}
                          alt={`Image ${index}`}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
              {/* Rendering image upload button after the images */}

              <div className="flex w-full items-center justify-center col-span-1">
                <Label
                  htmlFor="dropzone-file"
                  className="flex w-full h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      JPEG, PNG, JPG (MAX. 1920x1080px)
                    </p>
                  </div>
                  <FileInput
                    id="dropzone-file"
                    className="hidden"
                    //onChange={handleFileChange}
                    onInput={handleFileChange}
                    ref={fileInputRef}
                  />
                </Label>
              </div>
            </div>
            {/* Event details grid */}
            <div className="grid grid-cols-5 gap-4 pt-10">
              {/* Details column */}
              <div className="col-span-5 md:col-span-3">
                {/* Header datas */}
                <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
                  <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-3xl dark:sm:text-white">
                    {eventQuery.data.name}
                  </h1>
                  <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">
                    {eventQuery.data.type}
                  </p>
                </div>
                {/* Rating / Location */}
                <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                  <dt className="sr-only">Type</dt>
                  <dt className="sr-only">Reviews</dt>
                  <dd className="text-yellow-400 flex items-center dark:text-yellow-400">
                    <RatingReact
                      value={eventQuery.data.rating}
                      name=""
                      readonly={true}
                    />
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
                    {eventQuery.data.address.city} ,{" "}
                    {eventQuery.data.address.country}
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
                  {eventQuery.data.long_description}
                </p>
                {/* Divider */}
                <div className="flex flex-col w-full">
                  <hr className="w-full h-0.5 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700" />
                </div>
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
                <div className="card w-full bg-white text-primary-content border my-5 hidden md:block">
                  <div className="card-body justify-center items-center">
                    <div className="grid grid-flow-col gap-1 lg:gap-5 text-center auto-cols-max">
                      <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">
                          2024.12.13
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Payment card */}
                <div className="card w-full bg-white text-primary-content border">
                  <div className="card-body">
                    <h2 className="card-title font-bold">Buy your ticket</h2>
                    <Datepicker disabled />
                    <p>Price</p>
                    <p>Ticket price: 124.000 Ft</p>
                    <p>EventIO fee: 12.400 Ft</p>
                    <p>Total: 136.400 Ft</p>
                    <div className="card-actions justify-end">
                      <button className="btn w-full my-5">Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Google maps Row */}
              <div className="col-span-5">
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
                  <GoogleMapSingleMarker
                    width={"100%"}
                    height={"500px"}
                    defaultZoom={14}
                    markerPosition={eventQuery.data.address.coordinate}
                  />
                </APIProvider>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <Footer />
    </>
  ) : null;
};

export default EventEditor;
