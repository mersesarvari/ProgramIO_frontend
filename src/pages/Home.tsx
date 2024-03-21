import { useState } from "react";
import OptionBar from "../components/navigation/OptionBar";
import MapPage from "./MapPage";
import ListPage from "./ListPage";

const renderPage = (activeView: number) => {
  switch (activeView) {
    case 0:
      return <ListPage />;
    case 1:
      return <MapPage />;
    case 2:
      return <></>;
    default:
      return <>Error page does not exists</>;
  }
};

const Home = () => {
  const [activeView, setActiveView] = useState(0);
  return (
    <>
      <OptionBar value={activeView} setValue={setActiveView} />
      <div className="flex h-full">{renderPage(activeView)}</div>
    </>
  );
};

export default Home;
