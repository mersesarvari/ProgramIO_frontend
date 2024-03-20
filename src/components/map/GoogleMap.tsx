import { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Marker } from "@react-google-maps/api";

const exampleData = [
  {
    lat: 47.5079,
    lng: 19.0454,
    key: "Hungarian Parliament Building",
  },
  {
    lat: 47.4966,
    lng: 19.0348,
    key: "Buda Castle",
  },
  {
    lat: 47.5009,
    lng: 19.0531,
    key: "St. Stephen's Basilica",
  },
  {
    lat: 47.4984,
    lng: 19.0428,
    key: "Chain Bridge",
  },
  {
    lat: 47.5024,
    lng: 19.0345,
    key: "Fisherman's Bastion",
  },
  {
    lat: 47.5146,
    lng: 19.0776,
    key: "Heroes' Square",
  },
  {
    lat: 47.4844,
    lng: 19.0582,
    key: "Great Market Hall",
  },
  {
    lat: 47.5189,
    lng: 19.0814,
    key: "Széchenyi Thermal Bath",
  },
  {
    lat: 47.5264,
    lng: 19.0436,
    key: "Margaret Island",
  },
  {
    lat: 47.4846,
    lng: 19.0429,
    key: "Gellért Hill",
  },
];

type MarkerPoint = { lat: number; lng: number; key: string };

type MarkerProps = {
  points: MarkerPoint[];
};

const Markers: React.FC<MarkerProps> = ({ points }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: MarkerPoint }>();
  const clusterer = useRef<MarkerClusterer | null>;

  useEffect(() => {
    if (!map) return;
    if (!map.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;
    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <span style={{ fontSize: "5rem" }}>🎉</span>
        </AdvancedMarker>
      ))}
    </>
  );
};

const GoogleMap = () => {
  const position = { lat: 47.5079, lng: 19.0454 };

  const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  };
  return (
    <APIProvider apiKey="AIzaSyBIgQHkge1pDUTdHp_HFzb2QKLiw_8UTG0">
      <div style={{ height: "100%", width: "100%" }}>
        <Map
          defaultZoom={12}
          defaultCenter={position}
          minZoom={1.93}
          mapId={"google-map-script"}
          restriction={{
            latLngBounds: WORLD_BOUNDS,
            strictBounds: false,
          }}
          disableDefaultUI={true}
          mapTypeId={"roadmap"}
        >
          <Markers points={exampleData} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
