import { BellAlertIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const AlertIcon = () => {
  const [isHovered, setHovered] = useState(false);
  return (
    <button
      style={{
        zIndex: 300,
        position: "absolute",
        color: "white",
        fontSize: "50px",
        width: "30px",
        top: "2%",
        left: "85%",
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <BellAlertIcon
        style={{
          color: isHovered ? "yellow" : "white",
          transform: isHovered ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      />
    </button>
  );
};

export default AlertIcon;
