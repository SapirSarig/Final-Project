
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import OffersStatus from '../offers/offersStatus.js';
import '../userHomePage/homePages.css';

class InfluencerHomePage extends Component {

    render() {
        const name = "influencer";
        return (
            <div className="influencerHomePage">
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

export default InfluencerHomePage;
