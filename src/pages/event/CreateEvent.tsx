import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Datepicker } from "flowbite-react";
import { setKey, geocode, RequestType } from "react-geocode";

function GetGeocode(address: string) {
  setKey("AIzaSyBIgQHkge1pDUTdHp_HFzb2QKLiw_8UTG0");
  geocode(RequestType.ADDRESS, address)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log("Geolocation results: ", results[0]);
      console.log(lat, lng);
    })
    .catch(console.error);
}

const CreateEvent = () => {
  const initialValues = {
    city: "",
    zipcode: 0,
    street: "",
  };

  const CustomTextArea = () => (
    <textarea
      id="long_description"
      name="long_description"
      rows={8}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
      placeholder="Write down what your event is about"
    ></textarea>
  );

  const validationSchema = Yup.object({});

  const handleSubmit = (values: any) => {
    console.log("[CreateEvent]: event creation", values);
    GetGeocode(
      `${values.country} ${values.state} ${values.zipcode} ${values.city} ${values.street}`
    );
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="max-w-lg mx-auto">
          {/* name */}
          {/* description */}
          <div className="grid grid-cols-8 gap-4">
            {/* Event name */}
            <div className="mb-5 col-span-3">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event title
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="event.IO"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* Event description */}
            <div className="mb-5 col-span-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="this is the short description of my event"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          {/* type */}
          {/* date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="md-5">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select the event type
              </label>
              <Field
                as="select"
                id="country"
                name="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event date
              </label>
              <Datepicker name="date" id="date" />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          {/* long description */}
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Long description
            </label>
            <Field as={CustomTextArea}></Field>
            <ErrorMessage
              name="long_description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          {/* country */}
          {/* state */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enited States"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <Field
                type="text"
                id="state"
                name="state"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="State"
                required
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          {/* city */}
          {/* postal code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enited States"
                required
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="zipcode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ZIP/Postal code
              </label>
              <Field
                type="number"
                id="zipcode"
                name="zipcode"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
              <ErrorMessage
                name="zipcode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          {/* Street */}
          <div className="mb-5">
            <label
              htmlFor="street"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Street
            </label>
            <Field
              type="text"
              id="street"
              name="street"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            <ErrorMessage
              name="street"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default CreateEvent;
