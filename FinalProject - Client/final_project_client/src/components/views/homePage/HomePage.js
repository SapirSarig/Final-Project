import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LayoutButton from '../../../common/layoutButton/layoutButton';
import NavToggle from '../../navToggle/navToggle';
import Logo from '../../../common/logo/logo';
import SessionStorageUtil from "../../../utils/SessionStorageUtil";

import './HomePage.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{}
        };
    }

    componentDidMount(){
        let user = SessionStorageUtil.GetLoggedUser();
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        
        return (
            <div className="guestScreenWrapper">
                {user && <NavToggle />}
                <Logo />
                <div className="emptyDiv"></div>
                <div className="leftContainer">
                    <div className="loginButtons">
                        <Link className="signUp" to="/signUp">
                            <LayoutButton text="Sign Up"/>
                        </Link>
                        <div className="preLine">
                            <div className="line"></div>
                            <div className="preLineText">ALREADY HAVE AN ACCOUNT?</div>
                            <div className="line"></div>
                        </div>
                        <Link className="login" to="/login">
                            <LayoutButton text="Log In"/>
                        </Link>
                    </div>
                </div>
                <div className="separeteLine"></div>
                <div className="rightContainer">
                    <div className="explanationWrapper">
                        <div className="explanation">
                            <div>Business Owner? Social Influencer?</div>
                            <div>Use our website to connect with each other!</div>
                        </div>
                    </div>
                    <Link to="/video">
                        <svg width="62" height="62" viewBox="0 0 153 153" className="playIcon">
                            <path d="M98.3 73.4L65 52.2c-1.4-.9-3.2-.9-4.6-.1-1.5.8-2.4 2.3-2.4 4v40.7c0 1.6.9 3.1 2.3 3.9.7.4 1.5.6 2.3.6s1.6-.2 2.3-.6l33.3-19.5c1.4-.8 2.2-2.2 2.2-3.8.1-1.7-.7-3.1-2.1-4z" />
                            <path d="M146.9 50.9c-7.6-21.1-24.1-37.6-45.3-45.2C93.5 2.8 85 1.4 76.4 1.4c-8.7 0-17.2 1.5-25.4 4.4-21.1 7.5-37.5 24-45.1 45C3 59.1 1.5 67.6 1.5 76.4c0 8.6 1.4 17 4.3 25 7.5 21.3 24 37.9 45.3 45.6 8.1 2.9 16.7 4.4 25.4 4.4 8.6 0 17.1-1.5 25.2-4.3 21.3-7.7 37.9-24.2 45.4-45.6 2.8-8 4.3-16.4 4.3-25 0-8.9-1.5-17.5-4.5-25.6zm-7 47.9C133.2 118 118.2 133 99 139.9c-7.2 2.6-14.9 3.9-22.6 3.9-7.9 0-15.5-1.3-22.8-4-19.1-6.9-33.9-21.8-40.7-40.9C10.3 91.6 9 84.1 9 76.3c0-7.9 1.3-15.6 4-23 6.9-18.9 21.6-33.6 40.6-40.5 7.3-2.6 15-4 22.8-4s15.4 1.3 22.6 3.9c19.1 6.8 33.9 21.6 40.7 40.6 2.7 7.3 4 15.1 4 23 .1 7.8-1.2 15.3-3.8 22.5z" />
                        </svg>
                    </Link>
                    {/* <div className="video">
                        <iframe width="420" height="345" src="https://www.youtube.com/embed/FlsCjmMhFmw" />
                    </div> */}
                </div>
                {/* <Route exact path="/" component={App} /> */}
            </div>
        );
    }
}

export default HomePage;