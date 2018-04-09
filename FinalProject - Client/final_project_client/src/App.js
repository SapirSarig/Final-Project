import React, { Component } from 'react';
import User from './Components/User/User.js'
import GuestScreen from './GuestScreen/GuestScreen.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GuestScreen />
      </div>
    );
  }
}

export default App;
