import React, { Component } from 'react';
import './layoutButton.css';

class LayoutButton extends Component {
  render() {
    return (
      <div className="layoutButtonWrapper" {...this.props}>
        <button className="layoutButton" onClick={this.props.onClick}>
          <span>{this.props.text}</span>
        </button>
      </div>
    );
  }
}

export default LayoutButton;
