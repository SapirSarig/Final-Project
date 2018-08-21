import React, { Component } from 'react';
import HomePage from './components/views/homePage/HomePage';
import LoginPage from './components/views/loginPage/LoginPage';
import Auction from './components/views/auction/auction';
import SignUpPage from './components/views/signUpPage/SignUpPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';


class App extends Component {


  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/SignUp" component={SignUpPage} />
            <Route path="/auction" component={Auction} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
