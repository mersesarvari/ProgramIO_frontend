import React from "react";

const FloatingComponent = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        top: "80%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "150px",
        backgroundColor: "rgba(40, 42, 54, 0.9)",
        padding: "10px",
        textAlign: "center",
        zIndex: 999, // Set a higher z-index
        color: "#f8f8f2", // Dracula text color
        borderRadius: "20px",
      }}
    >
      <p>This is a floating component at the bottom of the screen</p>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default FloatingComponent;
