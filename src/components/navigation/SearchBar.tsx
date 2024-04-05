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

  const getButtonStyles = (index: number) => {
    let styles = "";
    //When one menu is active but not this one
    if (openedIndex !== index && openedIndex !== null) {
      styles +=
        "bg-gray-200 border-gray-200 hover:bg-gray-300 hover:border-gray-300";
    }
    //When menu is active
    if (openedIndex === index) {
      styles += ` border-gray-400 bg-white z-500`;
    }
    //When all menu is inactive
    if (openedIndex === null) {
      styles += ` hover:bg-gray-200 hover:border-gray-300 border-white `;
    }
    //When next is active
    if (openedIndex === index + 1) {
      styles += `w-[300px]`;
    }

    return `${styles} w-full`;
  };

  return (
    <>
      {/* Search navitem */}
      <div
        ref={ref}
        className="flex pt-16 bg-gray-50 h-84 w-full border-b-2 border-gray-200 items-center justify-center text-center"
      >
        {/* SearchBar */}
        <div
          className={`w-8/12 xl:w-6/12 h-[72px] ${
            openedIndex === null ? " bg-white" : "bg-gray-200"
          } rounded-full flex flex-row border-gray-300 border-2 size-full group`}
        >
          {/* Button 1 */}
          <button
            className={`basis-4/12 rounded-full border-x-2 ${getButtonStyles(
              1
            )}`}
            onClick={() => setOpenedIndex(1)}
            tabIndex={1}
          >
            <div className="m-auto text-left ml-6 py-auto">
              <div className="text-sm font-bold text-black">Where</div>
              <div className="text-sm font-normal text-gray">
                Search locations
              </div>
            </div>
          </button>

          {/* Button 2 */}
          <button
            className={`basis-2/12 rounded-full border-x-2 ${getButtonStyles(
              2
            )}`}
            onClick={() => setOpenedIndex(2)}
            tabIndex={2}
          >
            <div className="m-auto text-left ml-6 py-auto">
              <div className="text-sm font-bold text-black">Where</div>
              <div className="text-sm font-normal text-gray">
                Search locations
              </div>
            </div>
          </button>
          {/* Button 3 */}
          <button
            className={`basis-2/12 rounded-full border-x-2 ${getButtonStyles(
              3
            )}`}
            onClick={() => setOpenedIndex(3)}
            tabIndex={3}
          >
            <div className="m-auto text-left ml-6 py-auto">
              <div className="text-sm font-bold text-black">Where</div>
              <div className="text-sm font-normal text-gray">
                Search locations
              </div>
            </div>
          </button>
          {/* Button 4 */}
          <button
            className={`basis-4/12 rounded-full border-x-2 ${getButtonStyles(
              4
            )}`}
            onClick={() => setOpenedIndex(4)}
            tabIndex={4}
          >
            <div className="m-auto text-left ml-6 py-auto">
              <div className="text-sm font-bold text-black">Where</div>
              <div className="text-sm font-normal text-gray">
                Search locations
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Searchbard;
