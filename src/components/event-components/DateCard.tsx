const DateCard = () => {
  return (
    <div className="card w-full bg-white text-primary-content border my-5 hidden md:block items-center justify-center">
      <div className="card-body m-auto px-0 items-center">
        <div className="grid grid-flow-col gap-1 lg:gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 15 }}></span>
            </span>
            days
          </div>
          <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 10 }}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 24 }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 49 }}></span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCard;
