import React, { Component } from 'react';
import HomePage from './components/views/homePage/HomePage';
import LoginPage from './components/views/loginPage/LoginPage';
import Auction from './components/views/auction/auction';
import SignUpPage from './components/views/signUpPage/SignUpPage';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import BusinessHomePage from './components/userHomePage/BusinessHomePage';
import InfluencerHomePage from './components/userHomePage/InfluencerHomePage';
import StarProfile from './components/profiles/StarProfile';
import Profile from './components/profiles/Profile';
import starOffer from './components/views/starOffer/starOffer';
import allOffers from './components/views/allOffers/allOffers';
import myAuctions from './components/views/myAuctions/myAuctions';
import AllAuctions from './components/allAuctions/AllAuctions';
import AllUsers from './components/allUsers/AllUsers';


import NegotiationPage from './components/negotiation/NegotiationPage';
import offersPerAuctionPage from './components/offers/offersPerAuctionPage';

class App extends Component {


  render() {
    return (
      <div>
        <Router>
          <div className="routeContainer">
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/SignUp" component={SignUpPage} />
            <Route path="/auction" component={Auction} />
            <Route path="/allOffers" component={allOffers} />
            <Route path="/starOffer" component={starOffer} />
            <Route path="/myAuctions" component={myAuctions} />
            <Route path="/starProfile" component={StarProfile} />
            <Route path="/profile" component={Profile} />
            <Route path = "/InfluencerHomePage" component ={InfluencerHomePage}/>
            <Route path="/businessHomePage" component={BusinessHomePage} />
            <Route path="/allAuctions" component={AllAuctions} />            
            <Route path="/allUsers" component={AllUsers} />       
            <Route path = "/NegotiationPage" component = {NegotiationPage}/>
            <Route path = "/offersPerAuctionPage" component = {offersPerAuctionPage}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
