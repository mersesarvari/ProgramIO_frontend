import { useParams } from "react-router-dom";

const EventSinglePage = () => {
  const eventId = useParams().id;
  return <div className="pt-20">Single Event page: {eventId}</div>;
};

export default EventSinglePage;
