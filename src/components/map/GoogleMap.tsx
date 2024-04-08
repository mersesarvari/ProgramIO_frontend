import React, { useEffect, useRef, useState } from "react";
import { Map } from "@vis.gl/react-google-maps";
import { useGetAllEventsQuery } from "../../app/api/eventApi";

type GoogleMapProps = {
  width?: string;
  height?: string;
  defaultZoom?: number;
  minZoom?: number;
  coordinate?: google.maps.LatLngLiteral;
};

const GoogleMap: React.FC<GoogleMapProps> = ({
  width = "auto",
  height = "103vh",
  defaultZoom = 4,
  minZoom = 1.93,
  coordinate,
}) => {
  const { data, isLoading, error } = useGetAllEventsQuery();
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [mapZoom, setMapZoom] = useState(defaultZoom);
  useEffect(() => {
    if (coordinate && coordinate.lat && coordinate.lng) {
      setMapCenter(coordinate);
      setMapZoom(13);
    } else {
      setMapZoom(2.1);
      setMapCenter({ lat: 0, lng: 0 });
    }
  }, [coordinate]);

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
        defaultCenter={mapCenter}
        minZoom={minZoom}
        mapId={"9298a4530532565e"}
        restriction={{
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
          strictBounds: false,
        }}
        zoom={mapZoom}
        center={mapCenter}
        disableDefaultUI={true}
        mapTypeId={"roadmap"}
        onDrag={() => {
          if (mapCenter) {
            setMapCenter(null);
          }
        }}
        onZoomChanged={() => {
          if (mapZoom) {
            setMapZoom(null);
          }
        }}
      ></Map>
    </div>
  ) : null;
};

export default GoogleMap;
