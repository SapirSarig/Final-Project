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
                Id: 1,
                Name: "Sapir",
                Picture: "",
                Interests: [
                    {
                        Value: "Sport",
                    },
                    {
                        Value: "Music"
                    }
                ],
                Description: "the best",
                DateOfBirth: "31/03/1993",
                SocialNetworks: [
                    {
                        Value: "Facebook",
                        LinkToProfile: "https://www.facebook.com/sapir.sarig"
                    },
                    {
                        Value: "Instagram",
                        LinkToProfile: "https://www.instagram.com/sapu9/"
                    }
                ],
                Reviews: [
                    {
                        value: "You are great!"
                    }
                ],
                Type: "Social Influencer"
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
            "Value": value
        }
        this.userService.AddReviewToUser(user.Id, obj).then(req => {
            //console.log(req);
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {
                    user.Reviews.push(obj);
                    this.setState({ user });
                }

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
                    <span> {user.Name} </span>

                    <span> Interests </span>
                    {user.Interests && user.Interests.length > 0 ?
                        <div className="interests">
                            {user.Interests.map(interest =>
                                (<div> {interest.value} </div>))}
                        </div> : <div>No Interests To Show!</div>}

                    <span> Description </span>
                    <span> {user.Description} </span>

                    {user.Type === "Social Influencer" ?
                        <StarProfile dateOfBirth={user.DateOfBirth} socialNetworks={user.SocialNetworks} /> : null}

                    <span> Reviews </span>
                    {user.Reviews && user.Reviews.length > 0 ?
                        <div className="reviews">
                            {user.Reviews.map(review =>
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