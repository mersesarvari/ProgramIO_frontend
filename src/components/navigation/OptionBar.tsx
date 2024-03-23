type OptionBarProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const OptionBar: React.FC<OptionBarProps> = ({ value, setValue }) => {
  return (
    <div
      style={{
        zIndex: 999,
        bottom: "20px",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          onClick={() => {
            setValue(0);
          }}
          className={`tab ${value === 0 ? "tab-active" : ""}`}
          style={{ width: "100px" }}
        >
          LIST
        </a>
        <a
          role="tab"
          onClick={() => {
            setValue(1);
          }}
          className={`tab ${value === 1 ? "tab-active" : ""}`}
          style={{ width: "100px" }}
        >
          MAP
        </a>
      </div>
    </div>
  );
};

export default OptionBar;
