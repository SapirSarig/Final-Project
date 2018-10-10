import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuctionInList from './auctionInList';

class hotAuctions extends Component {

    render() {
        // const listOfauctions = [];
        // listOfauctions.push("ABC");
        // listOfauctions.push("FDS");
        // listOfauctions.push("EWR");
        // listOfauctions.push("VLF");
        const {auctions, user} = this.props;

        return (
            auctions &&
            auctions.length > 0 ?  
            <div className="hotAuctions">
                Hot Auctions:
                {
                    auctions.map((auction) =>
                    <AuctionInList auction={auction} user={user}/>)
                }
            </div> 
            : <div>No Auctions Yet!</div>
        );
    }
} 
export default hotAuctions;
