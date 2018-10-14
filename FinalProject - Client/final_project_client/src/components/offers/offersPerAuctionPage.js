import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OfferService from '../../services/apis/OfferService';
import OffersList from './offersList';

class offersPerAuctionPage extends Component {
    OfferService
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        }
        this.getOffersPerAuction = this.getOffersPerAuction.bind(this);
        this.OfferService = new OfferService();
    }

    componentDidMount() {
        this.getOffersPerAuction();
        //setInterval(this.getOffersPerAuction, 10000);
    }

    getOffersPerAuction() {
        const { auction } = this.props.location.state;
        //const auction = { id: 1 }

        this.OfferService.getOffersByAuctionId(auction.Id).then(offers => {
            this.setState({ offers });
        })
    }

    render() {
        const { auction, user } = this.props.location.state;
        //const Auction = { id: 1, Title: "cola" };
        const { offers } = this.state;
        return (

            <div className="offersPerAuctionContainer" >
                {console.log("user", this.props.location.state.user)} 
                {console.log("auction", this.props.location.state.auction)}

                <div className="offersPerAuctionHeader">
                    <div>Auction No. : {auction.Id}</div>
                    <div>Auction Name : {auction.Title}</div>
                    <br />
                </div>
                {console.log("offers", offers)}
                <OffersList offers={offers} fromBusiness={true} user={user}/>
            </div>
        );
    }
}

export default offersPerAuctionPage;