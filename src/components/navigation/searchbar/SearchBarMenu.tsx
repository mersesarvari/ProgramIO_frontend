type SearchBarMenuProps = {
  isOpened: boolean;
  setOpened?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBarMenu: React.FC<SearchBarMenuProps> = ({
  isOpened,
  setOpened,
  children,
}) => {
  return (
    <>
      <div
        className={`bg-white z-50 fixed top-48 left-1/2 transform -translate-x-1/2 rounded-3xl border-2 ${
          isOpened ? "block" : "hidden"
        } w-8/12 xl:w-6/12 h-[400px] m-auto`}
      >
        {children}
      </div>
    </>
  );
};

export default SearchBarMenu;
