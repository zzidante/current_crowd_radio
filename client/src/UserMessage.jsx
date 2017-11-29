import React from "react";

function UserMessage({ userMessage: { message, style } }) {
  const alertClass = `alert alert-${style}`;
  const divStyles = {
    display: "inline-table",
    position: "absolute",
    top: "100%",
    left: "0px",
    width: "100%"
   }
  return (
    <div id="message" className={alertClass} style={divStyles}>
      <p>{message}</p>
    </div>
  );
}

export default UserMessage;
