import { APIProvider } from "@vis.gl/react-google-maps";
import GoogleMap from "../components/map/GoogleMap";

const MapPage = () => {
  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <GoogleMap />
      </APIProvider>
    </>
  );
};

export default MapPage;
