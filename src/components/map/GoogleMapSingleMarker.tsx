import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

type GoogleMapProps = {
  width?: string;
  height?: string;
  defaultZoom?: number;
  minZoom?: number;
  markerPosition: { lng: number; lat: number };
};

const GoogleMapSingleMarker: React.FC<GoogleMapProps> = ({
  width = "auto",
  height = "103vh",
  defaultZoom = 2,
  markerPosition,
  minZoom = 1.93,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });
  // Set the defaultCenter prop of the Map component to markerPosition
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    console.log("Trying to set new center");
    map.setCenter(markerPosition);
  }, [markerPosition]);

  console.log("Google map marker coordinate", markerPosition);
  const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  };
  return isLoaded ? (
    <div
      style={{
        height: height,
        width: width,
      }}
      className="border-gray-300 border-2 rounded-md my-5"
    >
      <Map
        defaultZoom={defaultZoom}
        defaultCenter={
          markerPosition ? markerPosition : { lat: 47.5079, lng: 19.0454 }
        } // Use markerPosition as the center
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
        {markerPosition ? (
          <AdvancedMarker
            className="probaMarker"
            position={markerPosition}
            key={markerPosition.toString()}
          >
            <img
              src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </AdvancedMarker>
        ) : null}
      </Map>
    </div>
  ) : null;
};

export default GoogleMapSingleMarker;
