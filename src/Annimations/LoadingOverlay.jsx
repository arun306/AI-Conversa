import React from "react";

const LoadingOverlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <p style={{ color: "white", fontSize: "1.5rem" }}>Loading...</p>
      {/* <iframe src="https://giphy.com/embed/SVIc7yScekraVF5Wam" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/colors-geometry-playful-SVIc7yScekraVF5Wam">via GIPHY</a></p> */}
    </div>
  );
};

export default LoadingOverlay;
