import Navbar from "../components/navigation/Navbar";
import SidebarTemplate from "../components/navigation/Sidebar";
import GoogleMapReact from "../components/GoogleMapReact";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <SidebarTemplate />
        <GoogleMapReact />
      </div>
    </>
  );
};

export default Home;
