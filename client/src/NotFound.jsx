import React from "react";
import panda from "./images/sad_panda.png";

function NotFound() {
  const divStyle = {
    backgroundcolor: "0E2E39",
    margin: "auto",
    width: "100vw"
  };
  const imgStyle = {
    maxwidth: "100vw"
  };
  return (
    <div style={divStyle}>
      <h1>
        <p>404</p>
      </h1>
      <img
        src={panda}
        alt="sorry..."
        height="375"
        width="375"
        style={imgStyle}
      />
    </div>
  );
}

export default NotFound;
