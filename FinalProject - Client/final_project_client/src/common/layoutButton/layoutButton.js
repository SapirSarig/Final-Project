import React, { Component } from 'react';
import './layoutButton.css';

class LayoutButton extends Component {
  render() {
    return (
      <div className="layoutButtonWrapper">
        <button className="layoutButton">
          <span>{this.props.text}</span>
        </button>
      </div>
    );
  }
}

export default LayoutButton;
