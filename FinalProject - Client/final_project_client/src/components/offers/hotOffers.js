import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/apis/UserService';
import OfferService from '../../services/apis/OfferService';

class HotOffers extends Component {
    userService;
    offerService;

    constructor(props) {
        super(props);

        this.state = {
            offers: []
        }

        this.getTop3Offers = this.getTop3Offers.bind(this);
        this.userService = new UserService();
        this.offerService = new OfferService();
    }

    componentDidMount() {
        const { user } = this.props;
        this.getAllOffersForUser(user);
    }

    getTop3Offers(offers){
        let res = [];

        if(offers.length > 3){
            for(let i = 0; i < 3; i++)
            res[i] = offers[i];
        }
        else
            res = offers;

        return res;
    }


    getAllOffersForUser(user) {
        if (user.Type === "Social Influencer") {
            this.userService.GetAllInfluencerUserOffers(user.Id).then(req => {
                const top3Offers = this.getTop3Offers(req);
                this.setState({ offers: top3Offers });
            });
        }
        else { 
            this.offerService.getAllOffersByBusinessUserId(user.Id).then(req => {
                const top3Offers = this.getTop3Offers(req);
                this.setState({ offers: req });
            });
        }

    }
    
    render() {
        // const statusOfOffers = [
        //     { name: "offer1", status: "pendding" },
        //     { name: "offer2", status: "waiting for seller to response" },
        //     { name: "offer3", status: "cancled" }
        // ];
        let {offers} = this.state;

        return (
            offers && offers.length > 0 ? <div className="hotOffers">
            Hot Offers:
                {offers.map(offer =>
                    (<div> 
                        offer's name: {offer.Description} 
                        <br/> 
                        Status: {offer.Status}
                        <br/> 
                        {/* <Link className="showOffer" to={{ pathname: "/starOffer", state: { }}} >
                            <button className="showOfferBtn">
                                Show offer
                            </button>
                        </Link> */}
                    </div>)
                    )}
            </div> :
            <div>No Offers Yet!</div>
        );
    }
}
export default HotOffers;