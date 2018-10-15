import React, { Component } from 'react';
import { connect } from 'react-redux';

import './navMenu.css';
import NavMenuLink from './navMenuLink';
import SessionStorageUtil from "../../utils/SessionStorageUtil";

class NavMenu extends Component {
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

    render(){
        const {user} = this.state;
        return (
            <nav className="navMenu">
                {
                   user && user.Type === "Business Owner"?
                   (
                    <div className="typeMenu">
                        <NavMenuLink title="Business Home Page" to={{pathname: "/businessHomePage" , state: { user }}} />
                        <NavMenuLink title="Business Profile" to={{pathname: "/profile" , state: { user }}} />
                    </div>
                   ) :
                   (
                    <div className="typeMenu">
                        <NavMenuLink title="Influencer Home Page" to={{pathname: "/influencerHomePage" , state: { user }}} />
                        <NavMenuLink title="Star Profile" to={{pathname: "/profile", state: { user }}} />
                    </div>
                   )

                }
                {/* <NavMenuLink title="My Profile" to={{pathname: {(user.Type === "Business Owner") ? "/businessHomePage" : "/influencerHomePage", state: { user } } /> */}
                <NavMenuLink title="Log out" to={"/"} logout="true"/> 
            </nav>
          );
    }
};

export default connect()(NavMenu);
