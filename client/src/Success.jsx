import React from "react";

function Success({ success }) {
  return (
    <div id="success-message" className="alert alert-success">
      {success}
    </div>
  );
}

export default Success;
