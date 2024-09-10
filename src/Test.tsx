import React, { useEffect } from "react";

export default function Test() {
  // Prevent default behavior for touch events
  const preventTouchDefault = (e: TouchEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Add event listeners to prevent default touch behavior
    document.addEventListener("touchstart", preventTouchDefault, {
      passive: false,
    });
    document.addEventListener("touchmove", preventTouchDefault, {
      passive: false,
    });

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("touchstart", preventTouchDefault);
      document.removeEventListener("touchmove", preventTouchDefault);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        overflow: "hidden", // Prevent scrolling
        border: "1px solid red",
        boxSizing: "border-box", // Ensure border is included in the element's total width and height
      }}
    >
      <div
        style={{
          border: "1px solid green",
          width: "100%",
          height: "100%", // Full height of the parent container
          boxSizing: "border-box", // Ensure border is included in the element's total width and height
        }}
      >
        rezs
      </div>
    </div>
  );
}
