import EventCard, { EventCardProps } from "../components/EventCard";

const Events = [
  {
    name: "Event1",
    title: "Title1",
    description: "Description1",
    imageURL:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg",
    id: "1",
    new: true,
    rating: 4.9,
  },
  {
    name: "Event2",
    title: "Title2",
    description: "Description2",
    imageURL:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg",
    id: "2",
    new: false,
    rating: 3,
  },
  {
    name: "Event3",
    title: "Title3",
    description: "Description3",
    imageURL:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg",
    id: "3",
    new: true,
    rating: 5,
  },
  {
    name: "Event4",
    title: "Title4",
    description: "Description4",
    imageURL:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg",
    id: "4",
    rating: 3.2,
    new: false,
  },
];

const renderCards = (data: any[]) => {
  return data.map((item, index) => (
    <div className="basis-1/4" key={index}>
      <EventCard eventItem={item} />
    </div>
  ));
};

const ListPage = () => {
  return (
    <div
      className="grid grid-flow-row-dense grid-cols-1 auto-rows-max
        lg:grid-cols-4 
        md:grid-cols-3 
        sm:grid-cols-2  
        pt-40
        xl:px-20
        lg:px-10
        "
    >
      {renderCards(Events)}
    </div>
  );
};

export default ListPage;
