import Sidebar from "../components/navigation/Sidebar";
import GoogleMapReact from "../components/GoogleMapReact";

const Home = () => {
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <GoogleMapReact />
      </div>
    </>
  );
};

export default Home;
