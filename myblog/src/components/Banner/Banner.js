import React from 'react';
import "./Banner.css";
import Typist from 'react-typist';

const Banner = (props) => {
   return <div className="intro route bg-image home" style={props.style}>
    <div className="overlay-itro"></div>
    <div className="intro-content display-table">
      <div className="table-cell">
        <div className="container">
          <h1 className="intro-title mb-4">{props.name}</h1>
            <p className="intro-subtitle"><span><Typist>{props.designation}</Typist></span><strong className="text-slider"></strong></p>
        </div>
      </div>
    </div>
  </div>
}

export default Banner;