import { usePlacesWidget } from "react-google-autocomplete";
import { GetGeocode } from "../../features/google-map/google-map-functions";
import { ErrorMessage, useFormikContext } from "formik";

type GoogleMapAutocompleteFieldProps = {
  name: string;
};

const GoogleMapAutocompleteField: React.FC<GoogleMapAutocompleteFieldProps> = ({
  name,
}) => {
  const { setFieldValue, field } = useFormikContext<any>();
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const { ref } = usePlacesWidget({
    apiKey: apiKey,
    options: {
      types: [],
      fields: [
        "address_components",
        "geometry.location",
        "geometry",
        "formatted_address",
      ],
    },
    libraries: ["places"],
    onPlaceSelected: async (place) => {
      const formattedAddress = place.formatted_address;
      console.log("Formatted address:", formattedAddress);
      //Getting the google data from the formatted address:
      if (!formattedAddress) throw new Error("Address cannot be found");
      const locationData = await GetGeocode(formattedAddress);
      if (!locationData) throw new Error("Couldn't get google location");
      console.log("Location fetched succesfully:", locationData);
      setFieldValue(name, locationData);
    },
  });
  return (
    <>
      <label
        htmlFor="googleMapAutocomplete"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search the address of your event.
      </label>
      <input
        type="text"
        id="googleMapAutocomplete"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search the address of your party here."
        ref={ref}
        {...field}
      />
      <ErrorMessage id="googleMapAutocomplete" name={name} />
    </>
  );
};

export default GoogleMapAutocompleteField;
