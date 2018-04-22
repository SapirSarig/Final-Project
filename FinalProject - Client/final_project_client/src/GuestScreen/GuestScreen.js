import React, { Component } from 'react';
import Login from './Login/Login.js';
import './GuestScreen.css';
import { Route, Link } from "react-router-dom";
import App from '../App';



class GuestScreen extends Component {

    render() {
        return (

            <div className="guestScreenWrapper">
                    <div className="siteHeader"><h1> It's A Deal !! </h1></div>

                    <div>
                        Are you a star on social networks like Facebook or Instagram?<br></br>
                        Do you own a business and looking for an opportunity to sell your products?<br></br>
                        Use our website to connect with each other!
                             </div>
                    <div className="explanation">
                        <Login />
                        <div>
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/FlsCjmMhFmw" />
                        </div>
                    </div>

                {/* <Route exact path="/" component={App} /> */}
            </div>

        );
    }
}

export default GuestScreen;