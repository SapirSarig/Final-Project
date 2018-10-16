import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "./HomeHeader.js";
import HotAuctions from "../userHomePage/hotAuctions.js";
import HotOffers from "../offers/hotOffers.js";
import NavToggle from "../navToggle/navToggle";
import OfferService from "../../services/apis/OfferService";
// import "../userHomePage/homePages.css";
import "./userHomePage.css";

class InfluencerHomePage extends Component {
    offerService;
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            updatedUser: {},
            isOffers: false,
        };

        this.offerService = new OfferService();
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

            this.offerService.getAllOffersByBusinessUserId(user.Id).then(req => {
                if ((req.length > 0)&& !(req.length === 1 && req[0].Status==="Deleted")) this.setState({ isOffers: true });
            });
        }
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
                {user && (
                    <div>
                        <div className="TopPage">
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
                                {<Link
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
                            <Link
                                className="allInfluencers styleLink"
                                to={{ pathname: "/allInfluencers", state: {} }}
                            >
                                All Influencers
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default InfluencerHomePage;
