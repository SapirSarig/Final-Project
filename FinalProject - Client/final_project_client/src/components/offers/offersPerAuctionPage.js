import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OfferService from '../../services/apis/OfferService';
import OffersList from './offersList';

class offersPerAuctionPage extends Component {
    OfferService
    constructor(props) {
        super(props);
        this.state = {
            offers: [
                {
                    by: "eli",
                    status: "pandding",
                    Description: "no cola no buy"
                },
                {
                    by: "ron",
                    status: "accepted",
                    Description: "movie with cola"
                }
            ]
        }
        this.getOffersPerAuction = this.getOffersPerAuction.bind(this);
        this.OfferService = new OfferService();
    }

    componentDidMount() {
        //this.getOffersPerAuction();
        //setInterval(this.getOffersPerAuction, 10000);
    }

    getOffersPerAuction() {
        const { auction } = this.props;
        this.OfferService.getOffersByAuctionId(auction.id).then(offers => {
            this.setState({ offers });
        })
    }

    render() {
        const Auction = { id: 1, Title: "cola" };
        const {offers} = this.state;
        return (
            //const { auction } = this.props;
            <div className="offersPerAuctionContainer" >
                <div className="offersPerAuctionHeader">
                    <div>Auction No. : {Auction.id}</div>
                    <div>Auction Name : {Auction.Title}</div>
                    <br />
                </div>
                <OffersList offers={offers} />
            </div>
        );
    }
}
export default offersPerAuctionPage;