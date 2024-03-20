import Sidebar from "../components/navigation/Sidebar";
import Intro from "../components/map/GoogleMapReact";
import FloatingComponent from "../components/FloatingComponent";

const Home = () => {
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <Intro />
        <FloatingComponent />
      </div>
    </>
  );
};

export default Home;
