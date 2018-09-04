import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class hotAuctions extends Component {

    render() {
        // const listOfauctions = [];
        // listOfauctions.push("ABC");
        // listOfauctions.push("FDS");
        // listOfauctions.push("EWR");
        // listOfauctions.push("VLF");
        const {auctions} = this.props;

        return (
            <div className="hotAuctions">
                Hot auctions:
                {auctions && auctions.map((auction) =>
                   <div>{auction.Description}</div>)
                }
            </div>
        );
    }
} 
export default hotAuctions;
