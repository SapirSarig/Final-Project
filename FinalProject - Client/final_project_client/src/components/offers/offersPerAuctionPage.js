import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OfferService from '../../services/apis/OfferService';
import OffersList from './offersList';
import NavToggle from "../navToggle/navToggle"
import "./offersPerAuctionPage.css";

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
        const { offers } = this.state;
        return (

            <div className="offersPerAuctionContainer" >
                <NavToggle />
                <div className="offersPerAuctionHeader">
                    <div>Auction Name : {auction.Title}</div>
                    <div>Auction No. : {auction.Id}</div>
                    <br />
                </div>
                <OffersList offers={offers} fromBusiness={true} user={user} />
            </div>
        );
    }
}

export default offersPerAuctionPage;