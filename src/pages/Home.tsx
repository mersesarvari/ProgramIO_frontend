import NavbarTemplate from "../components/NavbarTemplate";
import SidebarTemplate from "../components/SidebarTemplate";
import Map from "../components/Map";
import GoogleMapReact from "../components/GoogleMapReact";
import FloatingComponent from "../components/FloatingComponent";

const Home = () => {
  return (
    <>
      <NavbarTemplate />
      <div className="flex h-full">
        <SidebarTemplate />
        <GoogleMapReact />
      </div>
    </>
  );
};

export default Home;
