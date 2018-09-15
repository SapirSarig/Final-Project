import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class offersPerAuctionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers =[]
        }
        this.getOffersPerAuction = this.getOffersPerAuction.bind(this);

    }

    componentDidMount() {
        this.getOffersPerAuction();
        setInterval(this.getNegotiationContent, 10000);
    }

    getOffersPerAuction() {
        const { Auction } = this.props;
        this.NegotiationService.getMessagesByOfferId(Auction.id).then(messages => {
            this.setState({ messages });
        })
    }

    render() {
        const { Auction } = this.props;

        <div className="offersPerAuctionContainer">
            <div className="offersPerAuctionHeader">
                <div>Auction No. : {Auction.id}</div>
                <div>Auction Name : {Auction.Title}</div>
                <br />
            </div>
            <div>Auctions: {Auction.Title}</div>


        </div>
    }
}
export default offersPerAuctionPage;