import React, { Component } from 'react';
import HomePage from './components/views/homePage/HomePage';
import LoginPage from './components/views/loginPage/LoginPage';
import Auction from './components/views/auction/auction';
import SignUpPage from './components/views/signUpPage/SignUpPage';
import InfluencerHomePage from './components/userHomePage/InfluencerHomePage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import StarHomePage from './components/homePages/StarHomePage';
import BusinessHomePage from './components/homePages/BusinessHomePage';
import StarProfile from './components/profiles/StarProfile';
import Profile from './components/profiles/Profile';
import starOffer from './components/views/starOffer/starOffer';
import allOffers from './components/views/allOffers/allOffers';
import myAuctions from './components/views/myAuctions/myAuctions';

class App extends Component {


  render() {
    return (
      <div className="container">
        <Router>
          <div className="routeContainer">
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/SignUp" component={SignUpPage} />
            <Route path="/auction" component={Auction} />
            <Route path="/starOffer" component={starOffer} />
            <Route path="/allOffers" component={allOffers} />
            <Route path="/myAuctions" component={myAuctions} />
            <Route path="/starHomePage" component={StarHomePage} />
            <Route path="/businessHomePage" component={BusinessHomePage} />
            <Route path="/starProfile" component={StarProfile} />
            <Route path="/profile" component={Profile} />
            <Route path = "/InfluencerHomePage" component ={InfluencerHomePage}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
