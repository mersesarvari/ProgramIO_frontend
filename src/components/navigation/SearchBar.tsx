import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import SearchBarMenu from "./SearchBarMenu";
import GoogleMapSearch from "../map/GoogleMapSearch";
import { APIProvider } from "@vis.gl/react-google-maps";
import GoogleLocationSearchInput from "../fields/GoogleLocationSearchInput";

const Searchbard = () => {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const ref = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenedIndex(null); // Reset openedIndex if clicked outside the SearchBar
      }
    };

    const handleBodyClick = (event) => {
      if (!ref.current.contains(event.target)) {
        setOpenedIndex(null); // Reset openedIndex if clicked anywhere outside the SearchBar
      }
    };

    document.body.addEventListener("click", handleBodyClick);
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getButtonStyles = (index: number) => {
    let styles = "";
    //When one menu is active but not this one
    if (openedIndex !== index && openedIndex !== null) {
      styles +=
        " rounded-full bg-gray-200 border-gray-200 hover:bg-gray-300 hover:border-gray-300 ";
    }
    //When menu is active
    if (openedIndex === index) {
      styles += ` rounded-full border-gray-400 bg-[white] `;
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

  useEffect(() => {
    console.log("Current address:", addressData);
  }, [addressData]);

  return (
    <>
      {/* Search navitem */}
      <div className="flex pt-16 bg-gray-50 h-84 w-full border-b-2 border-gray-200 items-center justify-center text-center">
        {/* SearchBar */}
        <div
          ref={ref}
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
                searchInputRef?.current?.focus();
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
                <GoogleLocationSearchInput
                  inputRef={searchInputRef}
                  data={addressData}
                  setData={setAddressData}
                  placeholder="Search your location"
                  className="bg-transparent border-none focus:border-none focus:border-0 focus:ring-0 m-0 p-0"
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
              <div className="flex flex-row">
                <div className="basis-8/12 m-auto text-left mx-6 py-auto">
                  <div className="text-sm font-bold text-black">Where</div>
                  <div className="text-sm font-normal text-gray">
                    Search locations
                  </div>
                </div>
                {/* Search icon */}
                <div className="basis-4/12 flex justify-end">
                  <div className="relative r-0 m-auto size-14 py-auto bg-red-700 rounded-full text-white font-bold text-sm items-center justify-center text-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MagnifyingGlassIcon className="size-6" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
          {/* Search menu */}
          <SearchBarMenu isOpened={openedIndex === null ? false : true}>
            <GoogleMapSearch
              width="100%"
              height="100%"
              //Setting new york as default coordinate
              coordinate={{
                lat: addressData?.lat ? addressData?.lat : 40.71427,
                lng: addressData?.lng ? addressData?.lng : -74.00597,
              }}
              zoom={9}
            ></GoogleMapSearch>
          </SearchBarMenu>
        </div>
      </div>
    </>
  );
};

export default Searchbard;
