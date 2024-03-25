import { RequestType, geocode, setKey } from "react-geocode";

export type AddressType = {
  formatted_address: string;
  route: string;
  street_number: string;
  city: string;
  state: string;
  postal: number;
  country: string;
  coordinate: {
    lat: number;
    lng: number;
  };
};

const GetGeocode = async (address: string) => {
  await setKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  console.log("GetGeocode recieved parameter:", address);
  const result = await geocode(RequestType.ADDRESS, address);
  if (result.status !== "OK")
    console.log("Cannot geolocate the address what you requested", result);
  if (!result.results[0]) throw new Error("Cannot get address from google map");

  const eventAddress = {} as AddressType;
  eventAddress.formatted_address = result.results[0].formatted_address;
  result.results[0].address_components.map((addressComponent) => {
    addressComponent.types.map((type) => {
      if (type === "street_number") {
        eventAddress.street_number = addressComponent.long_name;
      }
      if (type === "route") {
        eventAddress.route = addressComponent.long_name;
      }
      if (type === "locality") {
        eventAddress.city = addressComponent.long_name;
      }
      if (type === "country") {
        eventAddress.country = addressComponent.long_name;
      }
      if (type === "postal_code") {
        eventAddress.postal = addressComponent.long_name;
      }
      if (type === "sublocality") {
        eventAddress.state = addressComponent.long_name;
      }
    });
  });
  eventAddress.coordinate = {
    lat: result.results[0].geometry.location.lat,
    lng: result.results[0].geometry.location.lng,
  };
  return eventAddress;
};

export { GetGeocode };
