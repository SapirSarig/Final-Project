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
            user: {
                id: 1,
                name: "Sapir",
                Picture: '../../images/AddAnImage.png',
                interests: [
                    {
                        value: "Sport",
                    },
                    {
                        value: "Music"
                    }
                ],
                description: "the best",
                dateOfBirth: "31/03/1993",
                socialNetworks: [
                    {
                        Value: "Facebook",
                        LinkToProfile: "https://www.facebook.com/sapir.sarig"
                    },
                    {
                        Value: "Instagram",
                        LinkToProfile: "https://www.instagram.com/sapu9/"
                    }
                ],
                reviews: [
                    {
                        value: "You are great!"
                    }
                ],
                type: "Social Influencer"
            },
            review: "",
            okDisabled: true
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
        // const { user } = this.props;

        // this.setState({
        //     user
        // })
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { okDisabled } = this.state;

        this.setState({
            [name]: value,
            okDisabled: false
        });
    }

    handleButtonOkClicked(event) {
        const { user } = this.state;
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let obj = {
            "value": value
        }
        this.userService.AddReviewToUser(user.id, obj).then(req => {
            //console.log(req);
            if (req) {
                user.reviews.push(obj);
                this.setState({ user });
            }
            else {
                alert("Server Error");
            }
        });
        let inputelem = document.getElementById("review");
        inputelem.value = null;
        inputelem.disabled = true;
        let okButton = document.getElementById("okButton");
        okButton.disabled = true;

        console.log(this.state);
    }

    render() {
        //const { review, type, name, interests, description, reviews, dateOfBirth, socialNetworks } = this.state;
        //const { user } = this.state;
        const { user } = this.state;
        let { okDisabled } = this.state;
        return (
            <div>
                {user && (<div className="Container">
                    <span> Image: </span>
                    <img src={user.Picture} className="logo" />

                    <span > Name </span>
                    <span> {user.name} </span>

                    <span> Interests </span>
                    {user.interests && user.interests.length > 0 ?
                        <div className="interests">
                            {user.interests.map(interest =>
                                (<div> {interest.value} </div>))}
                        </div> : <div>No Interests To Show!</div>}

                    <span> Description </span>
                    <span> {user.description} </span>

                    {user.type === "Social Influencer" ?
                        <StarProfile dateOfBirth={user.dateOfBirth} socialNetworks={user.socialNetworks} /> : null}

                    <span> Reviews </span>
                    {user.reviews && user.reviews.length > 0 ?
                        <div className="reviews">
                            {user.reviews.map(review =>
                                (<div> {review.value} </div>))}
                        </div> : <div>No Reviews Yet!</div>}

                    <span> Write A Review </span>
                    <input id="review" type="text" name="review" onChange={this.handleInputChange} />
                    <button id="okButton" value={!!document.getElementById("review") ? document.getElementById("review").value : null} disabled={okDisabled} onClick={this.handleButtonOkClicked}> OK </button>
                </div>)}
            </div>
        );
    }
}

export default Profile;