import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "./HomeHeader.js";
import HotAuctions from "../userHomePage/hotAuctions.js";
import HotOffers from "../offers/hotOffers.js";
import NavToggle from "../navToggle/navToggle";
import OfferService from "../../services/apis/OfferService";
import UserService from "../../services/apis/UserService";
// import "../userHomePage/homePages.css";
import "./userHomePage.css";
import HomeFooter from './HomeFooter';
import SessionStorageUtil from "../../utils/SessionStorageUtil";
import LocalStorageUtil from "../../utils/LocalStorageUtil";

class InfluencerHomePage extends Component {
    offerService;
    userService;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            updatedUser: {},
            isOffers: false,
        };

        this.offerService = new OfferService();
        this.userService = new UserService();
        this.checkIfAllOffersDeleted = this.checkIfAllOffersDeleted.bind(this);
    }

    componentWillMount() {
        const { location } = this.props;
        if (location && location.state) {
            const { user } = location.state;
            const { updatedUser } = location.state;
            if (updatedUser) {
                this.setState({ updatedUser });
            } else {
                this.setState({ user });
            }
            this.getUserOffers(user.Id);
        } else {
            const user = SessionStorageUtil.GetLoggedUser() || LocalStorageUtil.GetLoggedUser;
            this.userService.getUserById(user.Id).then(req => {
                this.setState({ user: req });
                this.getUserOffers(req.Id);
            })
        }
    }

    getUserOffers(userId) {
        this.userService.GetAllInfluencerUserOffers(userId).then(req => {
            if (req && (req.length > 0) && !(this.checkIfAllOffersDeleted(req))) this.setState({ isOffers: true });
        });
    }

    checkIfAllOffersDeleted(req) {
        for (let i = 0; i < req.length; i++) {
            if (req[i].Status !== "Deleted") {
                return false;
            }
        }
        return true;
    }

    render() {
        const userInfo = {
            Name: "rinat",
            Email: "rinat@gmail.com",
            ConfirmEmail: "rinat@gmail.com",
            Picture: "string",
            Description: "pop",
            Type: "Social Influencer",
            CompanyName: "cola",
            WebsiteLink: "www.walla.com",
            SocialNetworks: [
                {
                    Value: "Facebook",
                    LinkToProfile: "www.Facebook.com"
                }
            ],
            Interests: [
                {
                    Value: "Sport"
                },
                {
                    Value: "Music"
                }
            ]
        };
        const { updatedUser, user, isOffers } = this.state;
        return (
            <div className="influencerHomePage">
                <NavToggle />
                {Object.getOwnPropertyNames(user).length > 0 && (
                    <div>
                        <div className="influencerTopPage">
                            <HomeHeader
                                user={
                                    Object.getOwnPropertyNames(updatedUser).length > 0
                                        ? updatedUser
                                        : user
                                }
                            />
                        </div>
                        <div className="contentWrapper">
                            <div className="ifluencerAuctions">
                                {/* We need to add "auctions" when user is created */}
                                <HotAuctions user={user} />
                                <Link
                                    to={{
                                        pathname: "/allAuctions",
                                        state: {
                                            user:
                                                Object.getOwnPropertyNames(updatedUser).length > 0
                                                    ? updatedUser
                                                    : user
                                        }
                                    }}
                                    className="styleLink"
                                >
                                    All Auctions
                                </Link>
                            </div>
                            <div className="RightPage">
                                {/* We need to add "offers" when user is created */}
                                <HotOffers user={user} />
                                {isOffers && <Link
                                    className="allOffers styleLink"
                                    to={{
                                        pathname: "/allOffers",
                                        state: {
                                            user:
                                                Object.getOwnPropertyNames(updatedUser).length > 0
                                                    ? updatedUser
                                                    : user, fromBusiness: false
                                        }
                                    }}
                                >
                                    My Offers
                                </Link>}
                            </div>
                            <HomeFooter user={
                                Object.getOwnPropertyNames(updatedUser).length > 0
                                    ? updatedUser
                                    : user
                            } />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default InfluencerHomePage;
