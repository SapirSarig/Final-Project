
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyAuctions from '../views/myAuctions/myAuctions.js';
import AuctionService from '../../services/apis/AuctionService';

class AllAuctions extends Component {
    auctionService;

    constructor(props) {
        super(props);
        this.state = {
            auctions:[],
            searchField:""
        };
        this.auctionService = new AuctionService();
    }

    componentDidMount() {
        this.auctionService.getAllAuctions().then(req=>{
            this.setState({auctions: req});
        })
    }

    render() {
        const {auctions} = this.state;

        return (
            <div className="allAuctions">
                <MyAuctions auctions={auctions}/>
            </div>
        );
    }
}

export default AllAuctions;