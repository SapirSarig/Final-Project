import React, { Component } from 'react';
import HomePage from './components/views/homePage/HomePage'
import LoginPage from './components/views/loginPage/LoginPage'
import StarSignUpPage from './components/views/starSignUpPage/StarSignUpPage'
import BusinessSignUpPage from './components/views/businessSignUpPage/BusinessSignUpPage'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';


class App extends Component {


  render() {
    return (
      <div className="App">
        <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/starSignUp" component={StarSignUpPage} />
          <Route path="/businessSignUp" component={BusinessSignUpPage} />
        </div>
        </Router>


      </div>
    );
  }
}

export default App;
