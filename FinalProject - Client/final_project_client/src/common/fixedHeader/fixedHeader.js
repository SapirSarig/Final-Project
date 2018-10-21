import React, { Component } from 'react';

import NavToggle from "../../components/navToggle/navToggle";
import Logo from "../logo/logo";

import './fixedHeader.css';

class FixedHeader extends Component {
    render() {
        return (
            <div className="fixedHeader">
                <NavToggle />
                <Logo />
            </div>
        );
    }
}

export default FixedHeader;
