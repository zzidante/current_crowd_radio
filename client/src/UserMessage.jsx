import React from "react";

function UserMessage({ userMessage: { message, style } }) {
  const alertClass = `alert alert-${style}`;
  return (
    <div id="message" className={alertClass}>
      {message}
    </div>
  );
}

export default UserMessage;
