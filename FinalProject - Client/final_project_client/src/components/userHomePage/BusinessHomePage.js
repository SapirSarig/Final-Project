
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader.js';
import HotAuctions from '../userHomePage/hotAuctions.js';
import OffersStatus from '../offers/offersStatus.js';
import AuctionService from '../../services/apis/AuctionService';
import '../userHomePage/homePages.css';
const initialState = {
    userInfo: {},
    theAuctions:[]
};

class BusinessHomePage extends Component {
    auctionService;
    constructor(props) {
        super(props);
        this.state = initialState;

        this.auctionService = new AuctionService();
        this.onMyAuctionsClick = this.onMyAuctionsClick.bind(this);
    }

    componentDidMount() {
        const { location } = this.props;
        console.log("location", location);
        if (location && location.state) {
            const { userInfo } = location.state;
            this.setState({ userInfo });
            console.log("userInfo", userInfo);


        }
    }

    // componentWillReceiveProps(nextProps){
    //     const { location } = this.props;
    //     if (location && location.state) {
    //         const { userInfo } = location.state;
    //         this.setState({ userInfo });


    //     }
    // }

    render() {
        //const name = "Coca Cola";
        const { userInfo, theAuctions } = this.state;
        // console.log("theAuctions", theAuctions);
        // const theAuctions = [{
        //     Title: 'Tal0'
        // }, {
        //     Title: 'Tal1'
        // }, {
        //     Title: 'Tal2'
        // }];

        return (
            <div className="businessHomePage">
                <div className="TopPage">
                    <HomeHeader name={userInfo.name} />
                </div>
                <div className="LeftPage">
                    {/* We need to add "auctions" when user is created */}
                    <HotAuctions auctions={userInfo.auctions} />
                    <Link className="myAuctions" to={{pathname:"/myAuctions", state:{auctions: theAuctions}}}>
                        <button className="myAuctions" onClick={this.onMyAuctionsClick}>
                            myAuctions
                        </button>
                    </Link>
                </div>
                <div className="RightPage">
                    {/* We need to add "offers" when user is created */}
                    <OffersStatus offers={userInfo.Offers} />
                    {/* <Link className="myOffers" to={{pathname:"/myOffers", state:{offers: theOffers}}}> */}
                        <button className="myOffers">
                            myOffers
                        </button>
                    {/* </Link> */}
                </div>
                <br/>
                <button> Add a New Auction </button>
                <br/>
                <button> All Influencers </button>

            </div>
        );
    }

    onMyAuctionsClick(event){
            const { userInfo } = this.state;
            console.log("userInfo", userInfo);
            if (userInfo){
                this.auctionService.getAuctionsByEmail(userInfo.email).then(req=>{
                    this.setState({theAuctions: req});
                    console.log(req);
                })
            }
    }
}



export default BusinessHomePage;
