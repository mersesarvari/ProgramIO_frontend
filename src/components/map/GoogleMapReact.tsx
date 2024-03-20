import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import FloatingComponent from "../../components/FloatingComponent";

/* const containerStyle = {
  width: "70%",
  height: "90%",
  margin: "auto",
  borderRadius: "25px",
  border: "2px solid gray",
}; */

const containerStyle = {
  width: "100%",
  height: "100%",
  margin: "auto",
  border: "2px solid gray",
};

const customMarkerStyle = {
  // CSS properties to customize the marker appearance
  color: "red",
  fontWeight: "bold",
  fontSize: "16px",
  background: "white", // Add background or border for visual distinction
  borderRadius: "50%", // Make it a circle
  padding: "5px", // Add padding around the content
  boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)", // Add subtle shadow
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
    minZoom: 1.93,
    restriction: {
      latLngBounds: WORLD_BOUNDS,
      strictBounds: false,
    },
    disableDefaultUI: true,
    mapTypeId: "roadmap",
  };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 47.49802433712875, lng: 19.053081835335856 }}
      zoom={20}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
      <Marker
        position={{ lat: 47.49802433712875, lng: 19.053081835335856 }}
        title={"Deák buli"}
        style={customMarkerStyle}
      />
    </GoogleMap>
  ) : null;
};

export default GoogleMapReact;
