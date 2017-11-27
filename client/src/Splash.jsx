import React, { Component } from "react";
import splashLogo from './images/Current_Crowd_Radio_Text_resize.png';

// import { setState, getState } from './index'
class Splash extends Component {

  render() {

    const textStyle = {
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: '4vw',
      display: 'block',
      lineHeight: '25vw',
      color: 'white',
      margin: '0',
    }

    const sloganStyle = {
      textAlign: 'center',
      position: 'relative',
      fontSize: '2vw',
      display: 'block',
      lineHeight: '0vw',
      color: 'white',
      marginTop: '-10vw'
    }


    const splashStyle = {
      backgroundImage: `url(${splashLogo})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      marginTop: '16em',
      height: '25vw',
      width: '100%'
    }

    return (
      <div style={splashStyle}>
        <h1 className="shadow-stroke" style={textStyle}>Current Crowd Radio</h1>        
        <p className="shadow-stroke" style={sloganStyle}>Music of the City</p>
      </div>
    );
  }
}

export default Splash;
