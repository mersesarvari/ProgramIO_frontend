import { Rating } from "flowbite-react";

const EventCard = () => {
  return (
    <div className="card-compact w-90">
      <figure className="px-5 pt-10 h-200">
        <img
          src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-left text-left">
        <div className="px-0 py-0 mx-2 mt-0">
          <h2 className="card-title">
            <div className="items-center w-full font-bold text-gray-900 dark:text-white">
              Shoes!
            </div>
            <Rating className="">
              <Rating.Star />
              <p className="mx-1 text-sm font-bold text-gray-900 dark:text-white text-left items-center">
                4.95
              </p>
            </Rating>
          </h2>
          <p>Proba header</p>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
