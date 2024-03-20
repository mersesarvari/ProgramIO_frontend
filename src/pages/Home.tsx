import Sidebar from "../components/navigation/Sidebar";
import GoogleMapReact from "../components/map/GoogleMapReact";
import FloatingComponent from "../components/FloatingComponent";
import GoogleMap from "../components/map/GoogleMap";

const Home = () => {
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <GoogleMap />
        <FloatingComponent />
      </div>
    </>
  );
};

export default Home;
