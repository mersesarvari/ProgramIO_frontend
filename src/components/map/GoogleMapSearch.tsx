import React, { useEffect, useState } from "react";
import { Map } from "@vis.gl/react-google-maps";
import { useGetAllEventsQuery } from "../../app/api/eventApi";

type GoogleMapProps = {
  width?: string;
  height?: string;
  defaultZoom?: number;
  defaultCenter?: { lat: number; lng: number };
  minZoom?: number;
  coordinate?: { lat: number; lng: number }; // New prop for coordinate
};

const GoogleMapSearch: React.FC<GoogleMapProps> = ({
  width = "auto",
  height = "103vh",
  defaultZoom = 9,
  defaultCenter = { lat: 47.5079, lng: 19.0454 },
  minZoom = 1.93,
  coordinate,
}) => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    // Update map center when coordinate prop changes
    if (coordinate) {
      setMapCenter(coordinate);
    }
  }, [coordinate]);

  const { data, isLoading, error } = useGetAllEventsQuery();

  const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  };

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
        defaultCenter={{ lng: 0, lat: 0 }}
        minZoom={minZoom}
        mapId={"9298a4530532565e"}
        restriction={{
          latLngBounds: WORLD_BOUNDS,
          strictBounds: false,
        }}
        disableDefaultUI={true}
        mapTypeId={"roadmap"}
        // Set center to mapCenter state
        center={mapCenter}
      ></Map>
    </div>
  ) : null;
};

export default GoogleMapSearch;
