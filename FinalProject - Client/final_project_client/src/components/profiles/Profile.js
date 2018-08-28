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
            name: "",
            interests: [],
            description: "",
            dateOfBirth: "",
            socialNetworks: [],
            reviews: [],
            review: "",
            type: "Social Influencer"
        }
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        // this.userService.getUser().then(req => {
        //     console.log(req);
        //     if (req) {
        //         this.setState({
        //             name: req.Name,
        //             interests: req.Interests,
        //             description: req.Description,
        //             dateOfBirth: req.DateOfBirth,
        //             socialNetworks: req.SocialNetworks
        //         });
        //     }
        // });
    }
    handleButtonOkClicked(event) {
        let { reviews } = this.state;
        const target = event.target;
        const value = target.value;
        const name = target.name;

        value && reviews.push(value);
        this.setState({
            reviews
        });
    }

    render() {
        const { review, type, name, interests, description, reviews, dateOfBirth, socialNetworks } = this.state;
        return (
            <div className="Container">
                <span> Image: </span>
                <img src={require('../../images/AddAnImage.png')} className="logo" />

                <span > Name </span>
                <span> {name} </span>

                <span> Interests </span>
                <span> {interests} </span>

                <span> Description </span>
                <span> {description} </span>

                {type === "Social Influencer" ?
                    <StarProfile dateOfBirth={dateOfBirth} socialNetworks={socialNetworks} /> : null}

                <span> Reviews </span>
                <span> {reviews.map(function (name, index) {
                    return <span key={index}>{name} <br /> </span>;
                })} </span>

                <span> Write A Review </span>
                <input id="review" type="text" name="review" value={review} onChange={this.handleInputChange} />
                <button onClick={this.handleButtonOkClicked} value={!!document.getElementById("review")? document.getElementById("review").value : null  }> OK </button>

            </div>
        );
    }
}

export default Profile;