import { APIProvider } from "@vis.gl/react-google-maps";
import { useState } from "react";
import SearchBar from "../components/navigation/searchbar/SearchBar";
import GoogleMap from "../components/map/GoogleMap";
import { useSelector } from "react-redux";

const MapPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const currentAddress = useSelector((state) => state.address.address);
  return (
    <>
      <div className="flex justify-center">
        <SearchBar
          openedIndex={hoveredIndex}
          setOpenedIndex={setHoveredIndex}
          className="w-full sm:w-10/12 lg:w-8/12 xl:w-6/12 z-50 fixed m-auto top-20"
        />
      </div>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          coordinate={{
            lat: currentAddress?.lat,
            lng: currentAddress?.lng,
          }}
        />
      </APIProvider>
    </>
  );
};

export default MapPage;
