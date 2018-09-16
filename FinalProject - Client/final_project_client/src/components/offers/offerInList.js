import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class offersInList extends Component {
    UserService
    constructor(props) {
        super(props);
        this.state = {
            from: ""
        }
        this.UserService = new UserService();
    }

    componentDidMount()
    {
        const { offer } = this.props;
        getUserNameById(offer.UserId);
    }

    getUserNameById(id)
    {
        this.UserService.getUserById(id).then(user => {
            this.setState({ from = user.Name });
        })
    }


    render() {
        const { offer } = this.props;
        const { from } = this.state;
        return (
            <div className="OffersContainer">
                <div> <span className="OffersAuthor"> From: </span> {from}</div>
                <div> Status: {offer.status} </div>
                <div> Description: </div>
                <div className="OfferDescription">
                    {offer.Description}
                </div>
                {/* send in props that the offer is already exist and need to show its details */}
                <Link className="starOffer" to="/starOffer">
                    <button className="starOfferBtn">
                        Show Offer
                    </button>
                </Link>
            </div >
        );
    }
}
export default offersInList;
