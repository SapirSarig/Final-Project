import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class offersList extends Component {

    render() {
        const {offers} = this.props;

        return (
            offers && offers.length > 0 ?  <div className="offersList">
                {offers.map((offer) =>
                   <div>{offer}</div>)
              }
            </div> :<div>No Offers Yet!</div>
        );
    }
} 
export default offersList;
