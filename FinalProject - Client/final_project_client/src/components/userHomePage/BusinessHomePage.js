// change to user from userInfo
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import HotOffers from '../offers/hotOffers.js';
import AuctionService from '../../services/apis/AuctionService';
import NavToggle from '../navToggle/navToggle';
import '../userHomePage/homePages.css';
import './businessHomePage.css';
import OffersStatus from '../offers/offersStatus';

const initialState = {
    user: {},
    theAuctions: [],
    updatedUser: {}
};

class BusinessHomePage extends Component {
    auctionService;
    constructor(props) {
        super(props);
        this.state = initialState;

        this.auctionService = new AuctionService();
        this.onMyAuctionsClick = this.onMyAuctionsClick.bind(this);
    }

    componentWillMount() {
        const { location } = this.props;
        console.log("location", location);
        if (location && location.state) {
            const { user } = location.state;
            const { updatedUser } = location.state;
            if (updatedUser) {
                this.setState({ updatedUser });

                this.auctionService.getAuctionsByEmail(updatedUser.Email).then(req => {
                    this.setState({ theAuctions: req });
                    console.log(req);
                })
            }
            else {
                this.setState({ user });

                this.auctionService.getAuctionsByEmail(user.Email).then(req => {
                    this.setState({ theAuctions: req });
                    console.log(req);
                })
            }
            this.onMyAuctionsClick();

        }
    }

    // componentWillReceiveProps(nextProps){
    //     const { location } = this.props;
    //     if (location && location.state) {
    //         const { userInfo } = location.state;
    //         this.setState({ userInfo });


    //     }
    // }
    onMyAuctionsClick(event) {
        const { user } = this.state;
        //console.log("userInfo", userInfo);
        if (user) {
            this.auctionService.getAuctionsByEmail(user.Email).then(req => {
                this.setState({ theAuctions: req });
                console.log(req);
            })
        }
    }

    render() {
        const { updatedUser, user, theAuctions } = this.state;
        console.log("theAuctions", theAuctions);
        return (
            <div className="businessHomePage">
                <NavToggle />
                {user &&
                    <div>
                        <div className="TopPage">
                            <HomeHeader user={Object.getOwnPropertyNames(updatedUser).length > 0 ? updatedUser : user} name={user.Name} />
                        </div>
                        <div className="contentWrapper">
                            <div className="LeftPage">
                                {/* We need to add "auctions" when user is created */}
                                <HotAuctions auctions={theAuctions} user={user}/>
                                <Link className="myAuctions" to={{ pathname: "/myAuctions", state: { auctions: theAuctions , title: "My Auctions", user: user} }}>
                                    <button className="myAuctionsBtn" onClick={this.onMyAuctionsClick}>
                                        my Auctions
                                    </button>
                                </Link>
                            </div>
                            <div className="RightPage">
                                {/* We need to add "offers" when user is created */}
                                <OffersStatus offers={user.Offers} />
                                {/* <Link className="myOffers" to={{pathname:"/myOffers", state:{offers: theOffers}}}> */}
                                <button className="myOffers"> All Offers </button>
                                {/* </Link> */}
                            </div>
                            <br />
                            <Link className="auction" to="/auction">
                                <button className="auctionBtn">
                                    Add Auction
                                </button>
                            </Link>
                            <br />
                            <button> All Influencers </button>
                        </div>
                        <div className="RightPage">
                            {/* We need to add "offers" when user is created */}
                            <HotOffers user={user} />
                            <Link className="allOffers" to={{pathname:"/allOffers", state:{user: this.state.user}}}>
                                <button className="allOffers"> All Offers </button>
                            </Link>
                        </div>
                        <br />
                        <Link className="auction" to={{ pathname: "/auction", state: { user: this.state.user, isNew: true } }}>
                            <button className="auctionBtn">
                                Add Auction
                            </button>
                        </Link>
                        <br />

                        <Link className="allInfluencers" to={{ pathname: "/allInfluencers", state: { } }}>
                            <button className="allInfluencersBtn">
                                All Influencers
                            </button>
                        </Link>
                    </div>}
            </div>
        );
    }
}

export default BusinessHomePage;
