import React, { Component } from 'react';
import User from './Components/User/User.js'
import GuestScreen from './GuestScreen/GuestScreen.js'
import LoginScreen from './LoginScreen/LoginScreen.js'
import StarSignUpScreen from './StarSignUpScreen/StarSignUpScreen.js'
import BusinessSignUpScreen from './BusinessSignUpScreen/BusinessSignUpScreen.js'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';


class App extends Component {

onClickLoginPage(event){

}

  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <Router>
        <div>
          <Route exact path="/" component={GuestScreen} />
          <Route path="/loginPage" component={LoginScreen} />
          <Route path="/StarSignUpScreen" component={StarSignUpScreen} />
          <Route path="/BusinessSignUpScreen" component={BusinessSignUpScreen} />
        </div>
        </Router>
=======
        avi 123123123
        <User />
		
>>>>>>> fb55e47adb9b07374b4a4c42ddd5e3e0ad9caf39
      </div>
    );
  }
}

export default App;
