import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuctionInList from './auctionInList';
import AuctionService from '../../services/apis/AuctionService';

import './hotAuctions.css';

class hotAuctions extends Component {
    auctionService;

    constructor(props) {
        super(props);

        this.state = {
            auctions: []
        }

        this.getTop3Auctions = this.getTop3Auctions.bind(this);
        this.getAllAuctionsForUser = this.getAllAuctionsForUser.bind(this);
        this.auctionService = new AuctionService();
    }

    componentWillMount() {
        const { user } = this.props;
        this.getAllAuctionsForUser(user);
    }

    getAllAuctionsForUser(user) {
        if (user.Type === "Social Influencer") {
            this.auctionService.getAllAuctions().then(req => {
                const top3Auctions = this.getTop3Auctions(req);
                this.setState({ auctions: top3Auctions });
            });
        }
        else {
            this.auctionService.getAuctionsByEmail(user.Email).then(req => {
                const top3Auctions = this.getTop3Auctions(req);
                this.setState({ auctions: top3Auctions });
            });
        }

    }

    getTop3Auctions(auctions) {
        let res = [];
        let counter = 0;
        if (auctions && auctions.length > 3) {
            for (let i = 0; counter < 3 && i < auctions.length; i++) {
                if (auctions[i].Status !== "Deleted") {
                    res[i] = auctions[i];
                    counter++;
                }
            }

        }
        else
            res = auctions;

        return res;
    }

    render() {

        const { user } = this.props;
        const { auctions } = this.state;

        return (
            auctions &&
                auctions.length > 0 ?
                <div className="hotAuctions">
                    Hot Auctions:
                <div className="auctionsList">
                        {
                            auctions.map((auction) =>
                                auction.Status !== "Deleted" && <AuctionInList auction={auction} user={user} />)
                        }
                    </div>
                </div>
                : <div className="noAuctionsMessage">No Auctions Yet!</div>
        );
    }
}
export default hotAuctions;
