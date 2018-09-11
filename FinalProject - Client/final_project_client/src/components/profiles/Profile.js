import React, { Component } from 'react';
import StarProfile from './StarProfile';
import UserService from '../../services/apis/UserService';

class Profile extends Component {
    userService;

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonOkClicked = this.handleButtonOkClicked.bind(this);
        this.userService = new UserService();
        this.state = {
            user:{}
            // name: "",
            // interests: [],
            // description: "",
            // dateOfBirth: "",
            // socialNetworks: [],
            // reviews: [],
            // type: "Social Influencer"
        }
    }

    componentDidMount() {
        const {user} = this.props;

        this.setState({
            user
        })
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleButtonOkClicked(event) {
        const {user} = this.state;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        user.Reviews.push(value)

        //this.userService.AddReviewToUser(user.Id, value);
        this.setState({
            user
        });

    }

    render() {
        //const { review, type, name, interests, description, reviews, dateOfBirth, socialNetworks } = this.state;
        const {user} = this.state;
        return (
            <div>
                {user && (<div className="Container">
                <span> Image: </span>
                <img src={require('../../images/AddAnImage.png')} className="logo" />

                <span > Name </span>
                <span> {user.name} </span>

                <span> Interests </span>
                <span> {user.interests} </span>

                <span> Description </span>
                <span> {user.description} </span>

                {user.type === "Social Influencer" ?
                    <StarProfile dateOfBirth={user.dateOfBirth} socialNetworks={user.socialNetworks} /> : null}

                <span> Reviews </span>
                <span> {user.Reviews && user.Reviews.map((name, index) => {
                    return <span key={index}>{name} <br /> </span>;
                })} </span>

                <span> Write A Review </span>
                <input id="review" type="text" name="review"/>
                <button onClick={this.handleButtonOkClicked} value={!!document.getElementById("review")? document.getElementById("review").value : null  }> OK </button>
                </div>)}
            </div>
        );
    }
}

export default Profile;