import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../components/fields/TextField";
import SelectField from "../../components/fields/SelectField";
import DatePickerField from "../../components/fields/DatePickerField";
import TextAreaField from "../../components/fields/TextAreaField";
import GoogleMapAutocompleteField from "../../components/fields/GoogleMapAutocompleteField";
import { useState } from "react";
import { AddressType } from "../../features/google-map/google-map-functions";
import { useCreateEventMutation } from "../../app/api/eventApi";

//TODO: Checking what data is nessecary for creating an event on the backend.
//TODo: If I want to save an address what does not have a state(Tatabánya) the app crashes.

const NewEventPage = () => {
  const createMutation = useCreateEventMutation();
  const [address, setAddress] = useState<AddressType>();
  const initialValues = {
    address,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required").min(8).max(30),
    description: Yup.string().required("Required"),
    long_description: Yup.string().required("Required").min(30).max(500),
    type: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    address: Yup.object().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    console.log("Values for handling:", values);
    await createMutation.mutateAsync(values);
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
          <GoogleMapAutocompleteField name="address" />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default NewEventPage;
