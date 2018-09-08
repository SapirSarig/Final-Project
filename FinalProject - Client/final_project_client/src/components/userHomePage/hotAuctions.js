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
            auctions && auctions.length > 0 ?  <div className="hotAuctions">
                Hot auctions:
                {auctions.map((auction) =>
                   <div>{auction}</div>)
              }
            </div> :<div>No Auctions Yet!</div>
        );
    }
} 
export default hotAuctions;
