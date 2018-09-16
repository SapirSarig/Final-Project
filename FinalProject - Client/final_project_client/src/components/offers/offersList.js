import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import offerInList from './offerInList';

class offersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { offers } = this.props;

        return (
            offers && offers.length > 0 ? <div className="offersList">
                {offers.map((offer) =>
                    <offerInList offer={offer} />)
                }
            </div> : <div>No Offers Yet!</div>
        );
    }
}
export default offersList;
