import { Map } from "@vis.gl/react-google-maps";
import { useGetAllEventsQuery } from "../../app/api/eventApi";
import { useEffect } from "react";

type GoogleMapProps = {
  width?: string;
  height?: string;
  defaultZoom?: number;
  defaultCenter?: { lat: number; lng: number };
  minZoom?: number;
  city?: { lat: number; lng: number }; // New prop for the city
};

const GoogleMapSearch: React.FC<GoogleMapProps> = ({
  width = "auto",
  height = "103vh",
  defaultZoom = 2,
  defaultCenter = { lat: 47.5079, lng: 19.0454 },
  minZoom = 1.93,
  city, // Receive the city prop
}) => {
  useEffect(() => {
    console.log("Google map center changed:", defaultCenter, defaultCenter);
  }, [defaultCenter]);

  //TODO: await implementation
  const { data, isLoading, error } = useGetAllEventsQuery();

  const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  };

  // Update defaultCenter if city prop is provided
  const center = city ? city : defaultCenter;

  return data && !isLoading ? (
    <div
      style={{
        height: height,
        width: width,
      }}
    >
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={defaultZoom}
        defaultCenter={center} // Use center variable
        minZoom={minZoom}
        mapId={"9298a4530532565e"}
        restriction={{
          latLngBounds: WORLD_BOUNDS,
          strictBounds: false,
        }}
        disableDefaultUI={true}
        mapTypeId={"roadmap"}
      ></Map>
    </div>
  ) : null;
};

export default GoogleMapSearch;
