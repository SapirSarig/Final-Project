import React, { Component } from "react";
import { Link } from "react-router-dom";
import LayoutButton from '../../common/layoutButton/layoutButton';
import UserService from "../../services/apis/UserService";
import OfferService from "../../services/apis/OfferService";

import './hotOffers.css';

class HotOffers extends Component {
  userService;
  offerService;

  constructor(props) {
    super(props);

    this.state = {
      offers: []
    };

    this.getTop3Offers = this.getTop3Offers.bind(this);
    this.userService = new UserService();
    this.offerService = new OfferService();
  }

  componentWillMount() {
    const { user } = this.props;
    this.getAllOffersForUser(user);
  }

  getAllOffersForUser(user) {
    if (user.Type === "Social Influencer") {
      this.userService.GetAllInfluencerUserOffers(user.Id).then(req => {
        const top3Offers = this.getTop3Offers(req);
        this.setState({ offers: top3Offers });
      });
    } else {
      this.offerService.getAllOffersByBusinessUserId(user.Id).then(req => {
        const top3Offers = this.getTop3Offers(req);
        this.setState({ offers: top3Offers });
      });
    }
  }

  getTop3Offers(offers) {
    let res = [];

    if (offers && offers.length > 3) {
      for (let i = 0; i < 3; i++) res[i] = offers[i];
    } else res = offers;

    return res;
  }

  render() {
    const { user } = this.props;    
    let { offers } = this.state;

    return offers && offers.length > 0 ? (
      <div className="hotOffers">
        Hot Offers:
        <div className="offersList">
          {offers.map(offer => (
            
            offer.Status!=="Deleted" && <div className="offerContainer">
              <div><span className="offerTitles">Offer's description:</span> <br/>{offer.Description}</div>
              <div><span className="offerTitles">Status: </span> {offer.Status}</div>

              <Link className="goToStarOffer" to={{ pathname: "/starOffer", state: { currOffer: offer, fromBusiness: (user.Type === "Business Owner"), fromAllOffers: true, user } }}>
                  Go To Offer
              </Link>

            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="noOffersMessage">No Offers Yet!</div>
    );
  }
}
export default HotOffers;
