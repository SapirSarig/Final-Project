
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import OffersStatus from '../offers/offersStatus.js';
import '../userHomePage/homePages.css';
const initialState = {
    userInfo: {}
};

class BusinessHomePage extends Component {
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
        //const name = "Coca Cola";
        const { userInfo } = this.state;
        const theAuctions = [{
            nameOfAuction: 'Tal1'
        }, {
            nameOfAuction: 'Tal2'
        }, {
            nameOfAuction: 'Tal3'
        }];

        return (
            <div className="businessHomePage">
                <div className="TopPage">
                    <HomeHeader name={userInfo.name} />
                </div>
                <div className="LeftPage">
                    {/* We need to add "auctions" when user is created */}
                    <HotAuctions auctions={userInfo.auctions} />
                    <Link className="myAuctions" to={{pathname:"/myAuctions", state:{auctions: theAuctions}}}>
                        <button className="myAuctions">
                            myAuctions
                        </button>
                    </Link>
                </div>
                <div className="RightPage">
                    {/* We need to add "offers" when user is created */}
                    <OffersStatus offers={userInfo.Offers} />
                    <button> All Offers </button>
                </div>
                <br/>
                <button> Add a New Auction </button>
                <br/>
                <button> All Influencers </button>

            </div>
        );
    }
}

export default BusinessHomePage;
