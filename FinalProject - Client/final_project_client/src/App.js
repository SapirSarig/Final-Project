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
import ForgotPassword from './components/login/ForgotPassword';
import NegotiationPage from './components/negotiation/NegotiationPage';
import offersPerAuctionPage from './components/offers/offersPerAuctionPage';
import EditProfile from "./components/editProfile/EditProfile";
import ResetPassword from "./components/resetPassword/ResetPassword";
import LocalStorageUtil from './utils/LocalStorageUtil';
import SessionStorageUtil from './utils/SessionStorageUtil';

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
        <Router>
          <div className="routeContainer">
            <PublicRoute exact path="/" component={HomePage} />
            <PublicRoute path="/login" component={LoginPage} />
            <PublicRoute path="/signUp" component={SignUpPage} />
            <PrivateRoute path="/auction" component={Auction} />
            <PrivateRoute path="/allOffers" component={allOffers} />
            <PrivateRoute path="/starOffer" component={starOffer} />
            <PrivateRoute path="/myAuctions" component={myAuctions} />
            <PrivateRoute path="/starProfile" component={StarProfile} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateInfluencerUserRoute path="/influencerHomePage" component={InfluencerHomePage} />
            <PrivateBusinessUserRoute path="/businessHomePage" component={BusinessHomePage} />
            <PrivateRoute path="/allAuctions" component={AllAuctions} />
            <PrivateRoute path="/allUsers" component={AllUsers} />
            <PrivateRoute path="/negotiationPage" component={NegotiationPage} />
            <PrivateRoute path="/offersPerAuctionPage" component={offersPerAuctionPage} />
            <PrivateRoute path="/forgotPassword" component={ForgotPassword} />
            <PrivateRoute path="/editProfile" component={EditProfile} />
            <PrivateRoute path="/resetPassword" component={ResetPassword} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
