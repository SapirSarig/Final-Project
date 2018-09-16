import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class offersStatus extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        // const statusOfOffers = [
        //     { name: "offer1", status: "pendding" },
        //     { name: "offer2", status: "waiting for seller to response" },
        //     { name: "offer3", status: "cancled" }
        // ];
        let {offers} = this.props;
        return (
            offers && offers.length > 0 ? <div className="offersStatus">
            Offers:
                {offers.map(offer =>
                    (<div> offer's name: {offer.Description} <br/> Status: {offer.status} </div>))}
            </div> :
            <div>No Offers Yet!</div>
        );
    }
}
export default offersStatus;