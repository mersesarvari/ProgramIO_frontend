import { APIProvider } from "@vis.gl/react-google-maps";
import EventGoogleMap from "../components/map/EventGoogleMap";

const MapPage = () => {
  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <EventGoogleMap />
      </APIProvider>
    </>
  );
};

export default MapPage;
