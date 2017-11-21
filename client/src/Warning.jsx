import React from 'react';

function Warning({warning, searchWarning}){
  return (
    <div id="warning-message" className="alert alert-danger">
     {warning || searchWarning}
    </div>
  )
}

export default Warning