import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { EventType } from "../../features/events/eventAPISlice";

type GoogleMapProps = {
  width?: string;
  height?: string;
  defaultZoom?: number;
  defaultCenter?: { lat: number; lng: number };
  minZoom?: number;
  event: EventType;
};

const GoogleMapSingleMarker: React.FC<GoogleMapProps> = ({
  width = "auto",
  height = "103vh",
  defaultZoom = 2,
  event,
  defaultCenter = event.address.coordinate,
  minZoom = 1.93,
}) => {
  console.log("Event data:", event);
  const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  };
  return event ? (
    <div
      style={{
        height: height,
        width: width,
      }}
      className="border-gray-300 border-2 rounded-md my-5"
    >
      <Map
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        minZoom={minZoom}
        mapId={"9298a4530532565e"}
        restriction={{
          latLngBounds: WORLD_BOUNDS,
          strictBounds: false,
        }}
        gestureHandling={"none"}
        disableDefaultUI={false}
        fullscreenControl={false}
        mapTypeId={"roadmap"}
      >
        <AdvancedMarker
          className="probaMarker"
          position={event.address.coordinate}
          key={event._id.toString()}
        >
          <img
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </AdvancedMarker>
      </Map>
    </div>
  ) : null;
};

export default GoogleMapSingleMarker;
