
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import HotOffers from '../offers/hotOffers.js';
import NavToggle from '../navToggle/navToggle';
import '../userHomePage/homePages.css';


class InfluencerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            updatedUser: {}
        }
    }

    componentWillMount() {
        const { location } = this.props;
        if (location && location.state) {
            const { user } = location.state;
            const { updatedUser } = location.state;
            if (updatedUser) {
                this.setState({ updatedUser });
            }
            else {
                this.setState({ user });
            }
        }
    }

    render() {
        const userInfo =
            {
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
        const { updatedUser, user } = this.state;
        return (
            <div className="influencerHomePage">
                <NavToggle />
                {user &&
                    <div>
                        <div className="TopPage">
                            <HomeHeader user={Object.getOwnPropertyNames(updatedUser).length > 0 ? updatedUser : user} />
                        </div>
                        <div className="LeftPage">
                            {/* We need to add "auctions" when user is created */}
                            <HotAuctions user={user}/>
                            <Link to={{ pathname: "/allAuctions", state: { user: Object.getOwnPropertyNames(updatedUser).length > 0 ? updatedUser : user } }}> All Auctions </Link>
                        </div>
                        <div className="RightPage">
                            {/* We need to add "offers" when user is created */}
                            <HotOffers user={user} />
                            <Link className="allOffers" to={{ pathname: "/allOffers", state:{user: Object.getOwnPropertyNames(updatedUser).length > 0 ? updatedUser : user, fromBusiness:false}}}>
                                <button className="allOffersBtn">
                                    My Offers
                                </button>
                            </Link>
                        </div>
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

export default InfluencerHomePage;
