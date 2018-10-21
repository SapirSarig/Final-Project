
import React, { Component } from 'react';
import MyAuctions from '../views/myAuctions/myAuctions.js';
import AuctionService from '../../services/apis/AuctionService';
// import NavToggle from '../navToggle/navToggle';
import FixedHeader from '../../common/fixedHeader/fixedHeader';
import './AllAuctions.css';

class AllAuctions extends Component {
    auctionService;

    constructor(props) {
        super(props);
        this.state = {
            auctions:[],
            searchField:"",
            user:{}
        };
        this.auctionService = new AuctionService();
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    }

    componentDidMount() {
        this.auctionService.getFilteredAuctions(this.state.searchField).then(req=>{
            this.setState({auctions: req});
        });
        
    }

    render() {
        const {auctions} = this.state;
        const user = this.props.location.state;

        return (
            <div className="allAuctions">
                {/* <NavToggle /> */}
                <FixedHeader />
                <div className="searchWrapper">
                    <label className="searchFieldLabel"> Search By Name: </label>
                    <input className="searchFieldInput" onChange={this.handleSearchFieldChange} />
                </div>
                <MyAuctions user={user} auctions={auctions} title="All Auctions"/>
            </div>
        );
    }

    handleSearchFieldChange(event){
        const searchStr = event.target.value;
        if(searchStr !== this.state.searchField){
            this.auctionService.getFilteredAuctions(searchStr).then(req=>{
                this.setState({auctions: [], searchField: searchStr});
                this.setState({auctions: req});
            })

        }
    }

}

export default AllAuctions;