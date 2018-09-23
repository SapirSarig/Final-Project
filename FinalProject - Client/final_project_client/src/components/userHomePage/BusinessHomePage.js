
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import OffersStatus from '../offers/offersStatus.js';
import '../userHomePage/homePages.css';


class BusinessHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            updatedUser: {}
        }    }

    componentDidMount() {
        const { location } = this.props;
        if (location && location.state) {
            const { userInfo } = location.state;
            const {updatedUser } = location.state;
            if(updatedUser)
            {
                this.setState({ updatedUser });

            }
            else{
                this.setState({ userInfo });

            }
        }
    }

    render() {
        //const name = "Coca Cola";
        const {  updatedUser } = this.state;
        const userInfo =
            {
                Name: "rinat",
                Email: "rinat@gmail.com",
                ConfirmEmail: "rinat@gmail.com",
                Picture: "string",
                Description: "pop",
                Type: "Business Owner",
                CompanyName: "cola",
                LinkToCompanySite: "www.walla.com",
                SocialNetworks: [
                    {
                        Value: "Facebook",
                        LinkToProfile: "www.facebook.com"
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
        return (
            <div className="businessHomePage">
                {userInfo &&
                    <div>
                        <div className="TopPage">
                            <HomeHeader  user={Object.getOwnPropertyNames(updatedUser).length > 0  ? updatedUser : userInfo}/>
                        </div>
                        <div className="LeftPage">
                            {/* We need to add "auctions" when user is created */}
                            <HotAuctions auctions={userInfo.Auctions} />
                            <Link className="myAuctions" to={{ pathname: "/myAuctions", state: { auctions: userInfo.Auctions } }}>
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
                        <br />
                        <Link className="auction" to="/auction">
                            <button className="auctionBtn">
                                Add Auction
                            </button>
                        </Link>
                        <br />
                        <button> All Influencers </button>
                    </div>}

            </div>
        );
    }
}

export default BusinessHomePage;
