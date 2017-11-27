import React, { Component } from 'react';
import miniLogo from "../images/small_logo_lt_gray.png"
// mini-brand-icon
class BrandDeclaration extends Component {
  
  render() {
    const imgStyle = {
      height: '40px',
      width: '40px',
      marginTop: '3px',
      margin: '0 5px 0 0',
    };

    return (
      <div className="mini-brand-container">
        <img
        src={miniLogo}
        alt="Radio Logo"
        style={imgStyle}
      />
        <a href="#">Current Crowd Radio</a>
      </div>
    )
  }
}

export default BrandDeclaration