// change to user from userInfo
import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "./HomeHeader.js";
import HotAuctions from "../userHomePage/hotAuctions.js";
import HotOffers from "../offers/hotOffers.js";
import AuctionService from "../../services/apis/AuctionService";
import NavToggle from "../navToggle/navToggle";
import Logo from '../../common/logo/logo';
import "../userHomePage/homePages.css";
import "./userHomePage.css";
import OffersStatus from "../offers/offersStatus";
import OfferService from "../../services/apis/OfferService";
import HomeFooter from './HomeFooter';
import SessionStorageUtil from "../../utils/SessionStorageUtil";
import LocalStorageUtil from "../../utils/LocalStorageUtil";
import UserService from '../../services/apis/UserService';

const initialState = {
    user: {},
    theAuctions: [],
    updatedUser: {},
    isOffers: false
};

class BusinessHomePage extends Component {
    auctionService;
    offerService;
    userService;
    constructor(props) {
        super(props);

        this.state = initialState;
        this.userService = new UserService();
        this.auctionService = new AuctionService();
        this.offerService = new OfferService();
        this.onMyAuctionsClick = this.onMyAuctionsClick.bind(this);
        this.checkIfAllOffersDeleted = this.checkIfAllOffersDeleted.bind(this);
        this.initUserDetails = this.initUserDetails.bind(this);
    }

    componentWillMount() {
        const { location } = this.props;
        if (location && location.state) {
            const { user } = location.state;
            const { updatedUser } = location.state;
            this.initUserDetails(user, updatedUser);
        } else {
            const user = SessionStorageUtil.GetLoggedUser() || LocalStorageUtil.GetLoggedUser;
            this.userService.getUserById(user.Id).then(req => {
                this.initUserDetails(req);
            })
        }
        
    }

    initUserDetails(user, updatedUser){
        if(user) {
            if (updatedUser) {
                this.setState({ updatedUser });

                this.auctionService.getAuctionsByEmail(updatedUser.Email).then(req => {
                    this.setState({ theAuctions: [] });
                    this.setState({ theAuctions: req });
                });
            } else {
                this.setState({ user });

                this.auctionService.getAuctionsByEmail(user.Email).then(req => {
                    this.setState({ theAuctions: req });
                });
            }

            this.offerService.getAllOffersByBusinessUserId(user.Id).then(req => {
                if (req && (req.length > 0)&& !(this.checkIfAllOffersDeleted(req))) this.setState({ isOffers: true });
            });
            this.onMyAuctionsClick();
        }
    }

    checkIfAllOffersDeleted(req){
        for(let i=0; i< req.length; i++){
            if(req[i].Status !=="Deleted"){
                return false;
            }
        }
        return true;
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
        if (user) {
            this.auctionService.getAuctionsByEmail(user.Email).then(req => {
                this.setState({ theAuctions: req });
            });
        }
    }

    render() {
        const { updatedUser, user, theAuctions, isOffers } = this.state;
        return (
            <div className="businessHomePage">
                <NavToggle />
                <Logo />
                {Object.getOwnPropertyNames(user).length > 0 && Object.getOwnPropertyNames(theAuctions).length > 0 &&  (
                    <div>
                        <div className="businessTopPage">
                            <HomeHeader
                                user={
                                    Object.getOwnPropertyNames(updatedUser).length > 0
                                        ? updatedUser
                                        : user
                                }
                                name={user.Name}
                            />
                        </div>
                        <div className="contentWrapper">
                            <div className="businessAuctions">
                                {/* We need to add "auctions" when user is created */}
                                <HotAuctions user={user} />
                                <div className="auctionBtns">
                                    {theAuctions.length !== 0 && (
                                        <Link
                                            className="myAuctionsLink styleLink"
                                            to={{
                                                pathname: "/myAuctions",
                                                state: {
                                                    auctions: theAuctions,
                                                    title: "My Auctions",
                                                    user: user
                                                }
                                            }}
                                            onClick={this.onMyAuctionsClick}
                                        >
                                            my Auctions
                                        </Link>
                                    )}
                                    <Link
                                        className="addAuction styleLink"
                                        to={{
                                            pathname: "/auction",
                                            state: { user: this.state.user, isNew: true }
                                        }}
                                    >
                                        Add Auction
                                    </Link>
                                </div>
                            </div>
                            <div className="businessOffers">
                                {/* We need to add "offers" when user is created */}
                                <HotOffers user={user} />
                                {isOffers && (
                                    <Link
                                        className="allOffers styleLink"
                                        to={{
                                            pathname: "/allOffers",
                                            state: { user: this.state.user, fromBusiness: true }
                                        }}
                                    >
                                        All Offers
                                    </Link>
                                )}
                            </div>
                            <HomeFooter user={
                                    Object.getOwnPropertyNames(updatedUser).length > 0
                                        ? updatedUser
                                        : user
                                }/> 
                            
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default BusinessHomePage;
