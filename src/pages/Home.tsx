import { useState } from "react";
import OptionBar from "../components/navigation/OptionBar";
import MapPage from "./MapPage";
import EventListPage from "./event/EventListPage";

const Home = () => {
  const [activeView, setActiveView] = useState(0);

  return (
    <>
      <OptionBar value={activeView} setValue={setActiveView} />
      {activeView === 0 && <EventListPage />}
      {activeView === 1 && <MapPage />}
      {activeView === 2 && <></>}
      {activeView !== 0 && activeView !== 1 && activeView !== 2 && (
        <>Error page does not exist</>
      )}
    </>
  );
};

export default Home;
