import React from 'react';

import './navMenu.css';
import NavMenuLink from './navMenuLink';
import { BrowserRouter as Router } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav className="navMenu">
        <Router>
            <div className="linksWrapper">
                <NavMenuLink title="Home" to="/" />
                <NavMenuLink title="My Profile" to="/profile" />
                <NavMenuLink title="Log out" to="/login" />
            </div>
        </Router>
    </nav>
  );
};

export default NavMenu;
