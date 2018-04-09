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
                        <span>It's</span><span>A</span><span>Deal</span>!!
                    </h1>
                    <div className="explanation">
                        jkhdfgjhglkhgkjgkrjgkrgjr
                        lkgjgkfjgkjgkfjgfkgjfkgjfk!
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