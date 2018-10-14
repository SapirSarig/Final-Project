
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/apis/UserService';
import UsersContainer from './UsersContainer';
import './AllUsers.css';

class AllInfluencers extends Component {
    userService;

    constructor(props) {
        super(props);
        this.state = {
            users:[],
            searchField:""
        };
        this.userService = new UserService();
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    }

    componentDidMount() {
        this.userService.getFilteredInfluencersByName(this.state.searchField).then(req=>{
            this.setState({users: req});
        })
    }

    render() {
        const {users} = this.state;
        
        return (
            <div className="allUsers">
                <label className="searchFieldLabel"> Search: </label>
                <input className="searchFieldInput" onChange={this.handleSearchFieldChange} />
                <UsersContainer users={users} title={"All Influencers"}/>
            </div>
        );
    }

    handleSearchFieldChange(event){
        const searchStr = event.target.value;
        if(searchStr !== this.state.searchField){
            this.userService.getFilteredInfluencersByName(searchStr).then(req=>{
                this.setState({users: [], searchField: searchStr});
                this.setState({users: req});
            })
        }
    }
}

export default AllInfluencers;