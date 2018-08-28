import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class hotAuctions extends Component {

    render() {
        const listOfauctions = [];
        listOfauctions.push("ABC");
        listOfauctions.push("FDS");
        listOfauctions.push("EWR");
        listOfauctions.push("VLF");

        return (
            <div className="hotAuctions">
                Hot auctions:
                {listOfauctions.map((auction) =>
                   <div>{auction}</div>)
                }
            </div>
        );
    }
} 
export default hotAuctions;
