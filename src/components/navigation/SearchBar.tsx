import { useEffect, useState, useRef } from "react";

const Searchbard = () => {
  const [openedIndex, setOpenedIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenedIndex(null); // Reset openedIndex if clicked outside
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex pt-16 bg-gray-100 h-44 w-full border-b-2 border-gray-300 items-center justify-center text-center"
    >
      <div
        className={`w-5/12 h-[68px] ${
          openedIndex === null ? " bg-white" : "bg-gray-200"
        } rounded-full flex flex-row border-gray-400 border-2 size-full group`}
      >
        <button
          className={`basis-1/2 rounded-full
          ${openedIndex !== 0 || (openedIndex !== null && "bg-white")}
          ${openedIndex === null && "hover:bg-gray-200"}
           w-full`}
          onClick={() => setOpenedIndex(0)}
          tabIndex={0}
        >
          <div className="m-auto text-left mx-8 py-2.5">
            <div className="text-sm font-bold text-black">Where</div>
            <div className="text-sm font-normal text-gray">
              Search locations
            </div>
          </div>
        </button>
        <button
          className={`basis-1/4 rounded-full
          ${openedIndex !== 1 || (openedIndex !== null && "bg-white")}
          ${openedIndex === null && "hover:bg-gray-200"}
          w-full`}
          onClick={() => setOpenedIndex(1)}
          tabIndex={1}
        >
          <div className="m-auto text-left mx-4 py-2.5">
            <div className="text-sm font-bold text-black">When</div>
            <div className="text-sm font-normal text-gray">Add date</div>
          </div>
        </button>
        <button
          className={`basis-1/4 rounded-full
          ${openedIndex !== 2 || (openedIndex !== null && "bg-white")}
          ${openedIndex === null && "hover:bg-gray-200"}
           w-full`}
          onClick={() => setOpenedIndex(2)}
          tabIndex={2}
        >
          <div className="m-auto text-left mx-4 py-2.5">
            <div className="text-sm font-bold text-black">What</div>
            <div className="text-sm font-normal text-gray">do you need</div>
          </div>
        </button>
        <button
          className={`basis-1/2 rounded-full
          ${openedIndex !== 3 || (openedIndex !== null && "bg-white")}
          ${openedIndex === null && "hover:bg-gray-200"}
           w-full`}
          onClick={() => setOpenedIndex(3)}
          tabIndex={3}
        >
          <div className="m-auto text-left mx-4 py-2.5">
            <div className="text-sm font-bold text-black">Looking for</div>
            <div className="text-sm font-normal text-gray">
              something specific
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Searchbard;
