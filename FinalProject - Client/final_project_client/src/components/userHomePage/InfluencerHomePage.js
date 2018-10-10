
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import OffersStatus from '../offers/offersStatus.js';
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

    componentDidMount() {
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
                LinkToCompanySite: "www.walla.com",
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
                            <HotAuctions auctions={user.Auctions} />
                            <button> All Auctions </button>
                        </div>
                        <div className="RightPage">
                            {/* We need to add "offers" when user is created */}
                            <OffersStatus offers={user.Offers} />
                            <Link className="allOffers" to="/allOffers">
                                <button className="allOffersBtn">
                                    allOffers
                                </button>
                            </Link>
                        </div>
                        <br />
                        <button> All Influencers </button>
                    </div>}
            </div>
        );
    }
}

export default InfluencerHomePage;
