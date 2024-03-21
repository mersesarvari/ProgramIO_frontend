import Sidebar from "../components/navigation/Sidebar";
import FloatingComponent from "../components/FloatingComponent";
import GoogleMap from "../components/map/GoogleMap";
import OptionBar from "../components/navigation/OptionBar";

const Home = () => {
  return (
    <>
      <OptionBar />
      <div className="flex h-full">
        {/* <Sidebar /> */}

        <GoogleMap />
        {/* <FloatingComponent /> */}
      </div>
    </>
  );
};

export default Home;
