import React from "react";

function Warning({ warning }) {
  return (
    <div id="warning-message" className="alert alert-danger">
      {warning}
    </div>
  );
}

export default Warning;
