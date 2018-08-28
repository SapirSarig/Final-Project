
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import OffersStatus from '../offers/offersStatus.js';
import '../userHomePage/homePages.css';

class BusinessHomePage extends Component {

    render() {
        const name = "Coca Cola";
        return (
            <div className="businessHomePage">
                <div className="TopPage">
                    <HomeHeader name={name} />
                </div>
                <div className="LeftPage">
                    <HotAuctions />
                </div>
                <div className="RightPage">
                    <OffersStatus />
                </div>
            </div>
        );
    }
}

export default BusinessHomePage;
