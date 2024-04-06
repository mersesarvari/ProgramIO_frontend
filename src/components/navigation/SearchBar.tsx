import { TextInput } from "flowbite-react";
import { useEffect, useState, useRef } from "react";

const Searchbard = () => {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ref = useRef(null);
  const searchInputRef = useRef(null);

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

  useEffect(() => {
    console.log("Hovered index:", hoveredIndex);
    console.log("Opened index:", openedIndex);
  }, [hoveredIndex, openedIndex]);

  const getButtonStyles = (index: number) => {
    let styles = "";
    //When one menu is active but not this one
    if (openedIndex !== index && openedIndex !== null) {
      styles +=
        " rounded-full bg-gray-200 border-gray-200 hover:bg-gray-300 hover:border-gray-300 ";
    }
    //When menu is active
    if (openedIndex === index) {
      styles += ` rounded-full border-gray-400 bg-white `;
    }
    //When all menu is inactive
    if (openedIndex === null) {
      styles += ` rounded-full bg-white hover:bg-gray-200 hover:border-gray-300 border-white `;
    }

    if (
      hoveredIndex === index &&
      openedIndex !== null &&
      openedIndex !== index
    ) {
      styles += `rounded-l-full`;
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
          className={`w-8/12 xl:w-6/12 h-[72px] z-400 my-10 ${
            openedIndex === null ? " bg-white" : "bg-gray-200"
          } rounded-full flex flex-row border-gray-300 border-2 size-full group`}
        >
          {/* Button 1 */}
          <div
            className={`basis-4/12 flex flex-row  ${
              openedIndex === 2 && hoveredIndex === 1
                ? " rounded-l-full bg-gray-300 "
                : " "
            }${
              openedIndex === 1 && hoveredIndex === 2
                ? " rounded-l-full bg-gray-300 "
                : " "
            }`}
          >
            <button
              className={`border-x-2 ${getButtonStyles(1)}`}
              onClick={() => {
                setOpenedIndex(1);
                searchInputRef.current.focus();
              }}
              onMouseEnter={() => {
                setHoveredIndex(1);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
              tabIndex={1}
            >
              <div className="m-auto text-left mx-6 py-auto">
                <div className="text-sm font-bold text-black">Where</div>
                <input
                  ref={searchInputRef}
                  className="bg-transparent border-none focus:border-none text-black outline-none w-full"
                  placeholder="Search events"
                />
              </div>
            </button>
          </div>
          {/* Button 2 */}
          <div
            className={`basis-2/12 flex flex-row ${
              //If the left item is hovered
              openedIndex === 2 && hoveredIndex === 1
                ? " rounded-r-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 2 && hoveredIndex === 3
                ? " rounded-l-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 1 && hoveredIndex === 2
                ? " rounded-r-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 3 && hoveredIndex === 2
                ? " rounded-l-full bg-gray-300 "
                : " "
            }`}
          >
            <button
              className={`rounded-full border-x-2 ${getButtonStyles(2)}`}
              onClick={() => setOpenedIndex(2)}
              onMouseEnter={() => {
                setHoveredIndex(2);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
              tabIndex={2}
            >
              <div className="m-auto text-left mx-6 py-auto">
                <div className="text-sm font-bold text-black">Where</div>
                <div className="text-sm font-normal text-gray">
                  Search locations
                </div>
              </div>
            </button>
          </div>
          {/* Button 3 */}
          <div
            className={`basis-2/12 flex flex-row ${
              //If the left item is hovered
              openedIndex === 3 && hoveredIndex === 2
                ? " rounded-r-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 3 && hoveredIndex === 4
                ? " rounded-l-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 2 && hoveredIndex === 3
                ? " rounded-r-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 4 && hoveredIndex === 3
                ? " rounded-l-full bg-gray-300 "
                : " "
            }`}
          >
            <button
              className={`size-full rounded-full border-x-2 ${getButtonStyles(
                3
              )}`}
              onClick={() => setOpenedIndex(3)}
              onMouseEnter={() => {
                setHoveredIndex(3);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
              tabIndex={3}
            >
              <div className="m-auto text-left mx-6 py-auto">
                <div className="text-sm font-bold text-black">Where</div>
                <div className="text-sm font-normal text-gray">
                  Search locations
                </div>
              </div>
            </button>
          </div>
          {/* Button 4 */}
          <div
            className={`basis-4/12 flex flex-row ${
              //If the left item is hovered
              openedIndex === 4 && hoveredIndex === 3
                ? " rounded-r-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 3 && hoveredIndex === 4
                ? " rounded-r-full bg-gray-300 "
                : " "
            }${
              //If the left item is hovered
              openedIndex === 4 && hoveredIndex === 3
                ? " rounded-r-full bg-gray-300 "
                : " "
            }`}
          >
            <button
              className={`size-full rounded-full border-x-2 ${getButtonStyles(
                4
              )}`}
              onClick={() => setOpenedIndex(4)}
              onMouseEnter={() => {
                setHoveredIndex(4);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
              tabIndex={4}
            >
              <div className="m-auto text-left mx-6 py-auto">
                <div className="text-sm font-bold text-black">Where</div>
                <div className="text-sm font-normal text-gray">
                  Search locations
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbard;
