
import React, { Component } from 'react';
import UserService from '../../services/apis/UserService';
import UsersContainer from './UsersContainer';
// import NavToggle from '../navToggle/navToggle';
import FixedHeader from '../../common/fixedHeader/fixedHeader';
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
                {/* <NavToggle /> */}
                <FixedHeader />
                <div className="allInfluencerContainer">
                    <div className="searchWrapper">
                        <label className="searchFieldLabel"> Search By Name: </label>
                        <input className="searchFieldInput" onChange={this.handleSearchFieldChange} />
                    </div>
                    <UsersContainer users={users} title={"All Influencers"}/>
                </div>
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