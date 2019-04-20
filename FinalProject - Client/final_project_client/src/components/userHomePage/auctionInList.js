import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './auctionInList.css';

class AuctionInList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { auction, user } = this.props;

        return (
            <div className="AuctionContainer">
                <div> <span className="AuctionName auctionTitles"> Auction:  </span> {auction.Title}</div>
                <div> <span className="auctionTitles">Product:</span> {auction.Product} </div>
                <div> <span className="auctionTitles">Description:</span><br/> {auction.Description}</div>
                <div> <span className="auctionTitles">Status:</span> {auction.Status} </div>
                {/* <div className="AuctionDescription">
                    {auction.Description}
                </div> */}
                {/* send in props that the auction is already exist and need to show its details */}
                <Link className="auctioLink" to={{ pathname: "/auction", state: { auction: auction, isNew: false, user:user}}} >
                    {/* <button className="auctionBtn"> */}
                        Show Auction
                    {/* </button> */}
                </Link>
            </div >
        );
    }
}
export default AuctionInList;