const HeaderImageCard = ({ imageQuery }) => {
  return (
    <div className="grid gap-3 grid-rows-2 grid-cols-4 h-[35vh] lg:h-[42vh] hidden md:grid">
      <img
        src={`data:image/webp;base64,${
          imageQuery.data.map((image) => image.imageData)[0]
        }`}
        className="w-full object-cover rounded-lg col-span-4 sm:col-span-2 row-span-1 sm:row-span-2 sm:h-full hidden md:block"
        alt=""
      />
      <img
        src={`data:image/webp;base64,${
          imageQuery.data.map((image) => image.imageData)[1]
        }`}
        className="h-full w-full object-cover rounded-lg row-span-1 col-span-4 sm:col-span-2 hidden md:block"
        alt=""
      />
      <img
        className="h-full w-full object-cover rounded-lg row-span-1 col-span-4 sm:col-span-2 hidden md:block"
        src={`data:image/webp;base64,${
          imageQuery.data.map((image) => image.imageData)[2]
        }`}
        alt=""
      />
    </div>
  );
};

export default HeaderImageCard;
