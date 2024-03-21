import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

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
  return (
    <>
      {points.map((point) => (
        <AdvancedMarker position={point} key={point.key}>
          {/* <span style={{ fontSize: "5rem" }}>🎉</span> */}
          <img
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          ></img>
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
      <div style={{ height: "100vh", width: "100vw" }}>
        <Map
          defaultZoom={12}
          defaultCenter={position}
          minZoom={1.93}
          mapId={"9298a4530532565e"}
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
