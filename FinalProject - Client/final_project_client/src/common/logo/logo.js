import React, { Component } from 'react';
import LogoImg from '../../images/logo.png';
import './logo.css';

class Logo extends Component {
  render() {
    return (
      <div className="logoContainer">
        <img src={LogoImg} className="logoImg"/>
      </div>
    );
  }
}

export default Logo;
