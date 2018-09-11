
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import OffersStatus from '../offers/offersStatus.js';
import '../userHomePage/homePages.css';

const initialState = {
    userInfo: {}
};

class InfluencerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const { location } = this.props;
        if (location && location.state) {
            const { userInfo } = location.state;
            this.setState({ userInfo });
        }
    }

    render() {
        //const name = "influencer";
        const { userInfo } = this.state;
        return (
            <div className="influencerHomePage">

                <div className="TopPage">
                    <HomeHeader name={userInfo.name} picture={userInfo.Picture} />
                </div>
                <div className="LeftPage">
                    {/* We need to add "auctions" when user is created */}
                    <HotAuctions auctions={userInfo.auctions} />
                    <button> All Auctions </button>
                </div>
                <div className="RightPage">
                    {/* We need to add "offers" when user is created */}
                    <OffersStatus offers={userInfo.Offers} />
                    <Link className="allOffers" to="/allOffers">
                        <button className="allOffersBtn">
                        allOffers
                        </button>
                    </Link>
                </div>
                <br/>
                <button> All Influencers </button>
            </div>
        );
    }
}

export default InfluencerHomePage;
