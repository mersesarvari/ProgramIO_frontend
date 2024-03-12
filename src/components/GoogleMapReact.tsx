import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import FloatingComponent from "./FloatingComponent";

const containerStyle = {
  width: "70%",
  height: "90%",
  margin: "auto",
  borderRadius: "25px",
  border: "2px solid gray",
};

// Center the map on Japan
const center = {
  lat: 36.2048,
  lng: 138.2529,
};

const GoogleMapReact = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBIgQHkge1pDUTdHp_HFzb2QKLiw_8UTG0",
  });
  const [map, setMap] = React.useState(null);

  const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  };

  const options = {
    minZoom: 1.6,
    restriction: {
      latLngBounds: WORLD_BOUNDS,
      strictBounds: false,
    },
    disableDefaultUI: true,
    mapTypeId: "roadmap",
  };

  const onLoad = React.useCallback(function callback(map) {
    const japanBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(20.0, 122.93457), // Southwest corner of Japan
      new window.google.maps.LatLng(45.551483, 153.986672) // Northeast corner of Japan
    );
    map.fitBounds(japanBounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : null;
};

export default GoogleMapReact;
