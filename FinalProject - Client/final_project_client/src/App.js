import React, { Component } from 'react';
import HomePage from './components/views/homePage/HomePage';
import LoginPage from './components/views/loginPage/LoginPage';
import Auction from './components/views/auction/auction';
import SignUpPage from './components/views/signUpPage/SignUpPage';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
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
import AllInfluencers from './components/allUsers/AllInfluencers';
import ForgotPassword from './components/login/ForgotPassword';
import NegotiationPage from './components/negotiation/NegotiationPage';
import offersPerAuctionPage from './components/offers/offersPerAuctionPage';
import EditProfile from "./components/editProfile/EditProfile";
import ResetPassword from "./components/resetPassword/ResetPassword";
import LocalStorageUtil from './utils/LocalStorageUtil';
import SessionStorageUtil from './utils/SessionStorageUtil';
import Nav from './components/nav/nav';
import Overlay from './components/overlay/overlay';
import Player from './components/player/player';
import AllNegotiations from './components/negotiation/AllNegotiaions';

const CheckIfUserAuthenticated = () => {
  const user = LocalStorageUtil.GetLoggedUser() || SessionStorageUtil.GetLoggedUser();
  if (user && user.Email) {
    return true;
  }
  return false;
}

const CheckIfCurrentTypeUserLogged = (type) => {
  const user = LocalStorageUtil.GetLoggedUser() || SessionStorageUtil.GetLoggedUser();
  if (user && type && user.Email && user.Type) {
    return user.Type === type
  }
  return false;
}

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    CheckIfUserAuthenticated() === true
      ? CheckIfCurrentTypeUserLogged("Business Owner")
        ? <Redirect state={LocalStorageUtil.GetLoggedUser() || SessionStorageUtil.GetLoggedUser()} to='/businessHomePage' />
        : <Redirect state={LocalStorageUtil.GetLoggedUser() || SessionStorageUtil.GetLoggedUser()} to='/influencerHomePage' />
      : <Component {...props} />
  )} />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    CheckIfUserAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const PrivateBusinessUserRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    CheckIfUserAuthenticated() === true 
    ? CheckIfCurrentTypeUserLogged("Business Owner")
      ? <Component {...props} />
      : CheckIfCurrentTypeUserLogged("Social Influencer")
        ? <Redirect state={LocalStorageUtil.GetLoggedUser() || SessionStorageUtil.GetLoggedUser()} to='/influencerHomePage' />
        : <Redirect to='/' />
      : <Redirect to='/login' />
  )} />
)

const PrivateInfluencerUserRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    CheckIfUserAuthenticated() === true 
    ? CheckIfCurrentTypeUserLogged("Social Influencer")
      ? <Component {...props} />
      : CheckIfCurrentTypeUserLogged("Business Owner")
        ? <Redirect state={LocalStorageUtil.GetLoggedUser() || SessionStorageUtil.GetLoggedUser()} to='/businessHomePage' />
        : <Redirect to='/' />
      : <Redirect to='/login' />
  )} />
)

class App extends Component {


  render() {
    return (
      <div>
        <Overlay />
        <Router>
          <div className="routeContainer">
            <Nav />
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signUp" component={SignUpPage} />
            <Route path="/auction" component={Auction} />
            <Route path="/allOffers" component={allOffers} />
            <Route path="/starOffer" component={starOffer} />
            <Route path="/myAuctions" component={myAuctions} />
            <Route path="/starProfile" component={StarProfile} />
            <Route path="/profile" component={Profile} />
            <Route path="/influencerHomePage" component={InfluencerHomePage} />
            <Route path="/businessHomePage" component={BusinessHomePage} />
            <Route path="/allAuctions" component={AllAuctions} />
            <Route path="/allUsers" component={AllUsers} />
            <Route path="/allInfluencers" component={AllInfluencers} />
            <Route path="/negotiationPage" component={NegotiationPage} />
            <Route path="/allNegotiations" component={AllNegotiations} />
            <Route path="/offersPerAuctionPage" component={offersPerAuctionPage} />
            {/* check forgot password route */}
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/editProfile" component={EditProfile} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/video" component={Player} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
