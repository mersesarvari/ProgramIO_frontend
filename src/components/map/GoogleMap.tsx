import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { requestApi } from "../../app/api/api";
import { useEffect } from "react";

type MarkerProps = {
  events: EventType[];
};

const Markers: React.FC<MarkerProps> = ({ events }) => {
  return (
    <>
      {events.map((event) => (
        <AdvancedMarker
          position={event.address.coordinate}
          key={event._id.toString()}
        >
          <img
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          ></img>
        </AdvancedMarker>
      ))}
    </>
  );
};

type GoogleMapProps = {
  width?: string;
  height?: string;
  defaultZoom?: number;
  defaultCenter?: { lat: number; lng: number };
  minZoom?: number;
};

const GoogleMap: React.FC<GoogleMapProps> = ({
  width = "auto",
  height = "103vh",
  defaultZoom = 2,
  defaultCenter = { lat: 47.5079, lng: 19.0454 },
  minZoom = 1.93,
}) => {
  //TODO: await implementation
  const { data, error, isLoading } = requestApi({
    method: "GET",
    url: "http://localhost:5000/event",
  });
  const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  };
  return data && !isLoading ? (
    <div style={{ height: height, width: width }}>
      <Map
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        minZoom={minZoom}
        mapId={"9298a4530532565e"}
        restriction={{
          latLngBounds: WORLD_BOUNDS,
          strictBounds: false,
        }}
        disableDefaultUI={true}
        mapTypeId={"roadmap"}
      >
        <Markers events={data} />
      </Map>
    </div>
  ) : null;
};

export default GoogleMap;
