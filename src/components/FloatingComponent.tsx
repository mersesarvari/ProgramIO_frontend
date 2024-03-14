import React from "react";

const FloatingComponent = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "600px",
        height: "150px",
        backgroundColor: "blue",
        padding: "10px",
        textAlign: "center",
        zIndex: 999, // Set a higher z-index
        color: "white",
        borderRadius: "20px",
      }}
    >
      <p>This is a floating component at the bottom of the screen</p>
    </div>
  );
};

export default FloatingComponent;