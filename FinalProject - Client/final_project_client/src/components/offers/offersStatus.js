import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class offersStatus extends Component {

    render() {
        const statusOfOffers = [
            { name: "offer1", status: "pendding" },
            { name: "offer2", status: "waiting for seller to response" },
            { name: "offer3", status: "cancled" }
        ];

        return (
            <div className="offersStatus">
            Offers:
                {statusOfOffers.map((offer) =>
                    <div> offer's name: {offer.name} Status: {offer.status} </div>)}
            </div>
        );
    }
}
export default offersStatus;