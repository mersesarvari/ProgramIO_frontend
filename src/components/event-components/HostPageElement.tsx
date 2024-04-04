const HostPageElement = () => {
  return (
    <div className="flex items-center">
      <div className="avatar">
        <div className="size-16 rounded-xl">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="pl-6">
        <p className="text-md text-black font-semibold">
          Hosted by {"MERSE SARVARI"}
        </p>
        <p className="font-normal text-gray-400 text-sm">
          Superhost - Hosting for 4 years
        </p>
      </div>
    </div>
  );
};

export default HostPageElement;
