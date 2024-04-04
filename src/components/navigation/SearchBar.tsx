const Searchbard = () => {
  return (
    <div className="flex pt-16 bg-gray-100 h-44 w-full border-b-2 border-gray-300 items-center justify-center text-center">
      <div className="bg-gray-400 w-5/12 h-[68px] rounded-full flex flex-row border-gray-400 border-2">
        <div className="basis-1/2 bg-white rounded-l-full border-r-2 border-gray-400">
          <div className="basis-1/2 bg-white rounded-l-full size-full rounded-full hover:bg-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-red-600 rounded-full"></div>
              <div className="m-auto text-left mx-8 py-2.5">
                <div className="text-sm font-bold text-black">Where</div>
                <div className="text-sm font-normal text-gray">
                  Search locations
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/4 bg-white border-r-2 border-gray-400">
          <div className="basis-1/2 bg-white hover:rounded-full size-full  hover:bg-gray-200">
            <div className="m-auto text-left mx-4 py-2.5">
              <div className="text-sm font-bold text-black">When</div>
              <div className="text-sm font-normal text-gray">Add date</div>
            </div>
          </div>
        </div>
        <div className="basis-1/4 bg-white border-r-2 border-gray-400">
          <div className="basis-1/2 bg-white hover:rounded-full size-full  hover:bg-gray-200">
            <div className="m-auto text-left mx-4 py-2.5">
              <div className="text-sm font-bold text-black">What</div>
              <div className="text-sm font-normal text-gray">do you need</div>
            </div>
          </div>
        </div>
        <div className="basis-1/2 bg-white rounded-r-full">
          <div className="basis-1/2 bg-white rounded-r-full size-full hover:rounded-full  hover:bg-gray-200">
            <div className="m-auto text-left mx-4 py-2.5">
              <div className="text-sm font-bold text-black">Looking for</div>
              <div className="text-sm font-normal text-gray">
                something specific
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbard;
