import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../components/fields/TextField";
import SelectField from "../../components/fields/SelectField";
import DatePickerField from "../../components/fields/DatePickerField";
import TextAreaField from "../../components/fields/TextAreaField";
import NumberField from "../../components/fields/NumberField";
import {
  EventType,
  useCreateEventMutation,
} from "../../features/events/eventAPISlice";
import { GetGeocode } from "../../features/google-map/google-map-functions";

const NewEventPage = () => {
  const [create] = useCreateEventMutation();
  const initialValues = {
    city: "",
    zipcode: 0,
    street: "",
    date: "",
    country: "",
  };

  const validationSchema = Yup.object({});

  const handleSubmit = async (values: any) => {
    console.log("[CreateEvent]: event creation", values);
    const result = await GetGeocode(
      `${values.country} ${values.state} ${values.zipcode} ${values.city} ${values.street}`
    );
    if (!result) console.log("Error address cannot be found");
    //TODO: Sending data to the server
    values.address = result;
    const CreateEventRequestObject: EventType = {
      name: values.name,
      description: values.description,
      long_description: values.long_description,
      type: values.type,
      date: values.date,
      address: values.address,
    };
    console.log("Event setup completed:", CreateEventRequestObject);
    const createResult = await create(CreateEventRequestObject);
    console.log(createResult);

    //console.log("Address:", address);
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="max-w-lg mx-auto">
          <div className="grid grid-cols-8 gap-4">
            {/* name */}
            <div className="mb-5 col-span-3">
              <TextField
                id="name"
                name="name"
                placeholder="event.IO"
                label="Name"
              />
            </div>
            {/* Event description */}
            <div className="mb-5 col-span-5">
              <TextField
                id="description"
                name="description"
                placeholder="describe your event"
                label="Description"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* type */}
            <div className="md-5">
              <SelectField
                id="type"
                name="type"
                label="Type"
                options={["Party", "Concert", "Pub"]}
              />
            </div>
            {/* date */}
            <div className="mb-5">
              <DatePickerField name="date" id="date" label="Date" />
            </div>
          </div>
          {/* long description */}
          <div className="mb-5">
            <TextAreaField name="long_description" label="Long Description" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              {/* country */}
              <SelectField
                name="country"
                id="country"
                label="Country"
                options={["US", "CA"]}
              />
            </div>
            <div className="mb-5">
              {/* state */}
              <TextField
                name="state"
                id="state"
                label="State"
                placeholder="Pest"
              />
            </div>
          </div>
          {/* city */}
          {/* postal code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-5">
              <TextField
                name="city"
                id="city"
                label="City"
                placeholder="Budapest"
              />
            </div>

            <div className="mb-5">
              <NumberField
                name="zipcode"
                id="zipcode"
                label="Postal / Zip code"
              />
            </div>
          </div>
          {/* Street */}
          <div className="mb-5">
            <TextField
              name="street"
              id="street"
              label="Street"
              placeholder="Pest"
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
export default NewEventPage;
