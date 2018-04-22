import React, { Component } from 'react';
import Login from './Login/Login.js';
import './GuestScreen.css';
import {Route, Link } from "react-router-dom";
import App from '../App';



class GuestScreen extends Component {

    render()
    {
        return(

            <div className = "guestScreenWrapper">
                <Login />
                <div className="explanationWrapper">
                    <h1>
                        <div className = "siteHeader"> It's A Deal !! </div>
                    </h1>
                    <div className="explanation"> 
                        Are you a star on social networks like Facebook or Instagram?<br></br>
                        Do you own a business and looking for an opportunity to sell your products?<br></br>                   
                        Use our website to connect with each other!
                    </div>
                    <iframe width="420" height="345" src="https://www.youtube.com/embed/FlsCjmMhFmw">
                    </iframe>
                    
                </div>
                {/* <Route exact path="/" component={App} /> */}
            </div>

        );
    }
}

export default GuestScreen;