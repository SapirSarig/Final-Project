import React, { Component } from 'react';
import StarProfile from './StarProfile';
import UserService from '../../services/apis/UserService';
import NavToggle from '../navToggle/navToggle';

import './profile.css';

class Profile extends Component {
    userService;

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonOkClicked = this.handleButtonOkClicked.bind(this);
        this.userService = new UserService();
        this.state = {
            user: {},
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
         const { user } = this.props;

         this.setState({
             user
         })
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
                <NavToggle />
                {user && (<div className="profileContainer">
                    <div className="rightSideWrapper">
                        <div className="profileImgWrapper">
                            <img src={user.Picture} className="profliePic" />
                        </div>
                        <span className="name"> {user.Name} </span>
                    </div>

                    <div className="interestsWrapper">
                        <span className="interestsTitle"> Interests: </span>
                        {user.Interests && user.Interests.length > 0 ?
                            <div className="interests">
                                {user.Interests.map(interest =>
                                    (<div> {interest.value} </div>))}
                            </div> : <div>No Interests To Show!</div>}
                    </div>
                    
                    <div className="descriptionWrapper">
                        <span> Description: </span>
                        <span> {user.Description} </span>
                    </div>

                    {user.Type === "Social Influencer" ?
                        <StarProfile dateOfBirth={user.DateOfBirth} socialNetworks={user.SocialNetworks} /> : null}
                    
                    <div className="reviewsWrapper">
                        <span> Reviews: </span>
                        {user.Reviews && user.Reviews.length > 0 ?
                            <div className="reviews">
                                {user.Reviews.map(review =>
                                    (<div> {review.value} </div>))}
                            </div> : <div>No Reviews Yet!</div>}
                    </div>
                    
                    <span> Write A Review: </span>
                    <textarea id="review" type="text" rows="2" name="review" onChange={this.handleInputChange} className="reviewInput" />
                    <button id="okButton" className={!okDisabled ? "reviewOkBtn" + " " + "enable" : "reviewOkBtn"} value={!!document.getElementById("review") ? document.getElementById("review").value : null} disabled={okDisabled} onClick={this.handleButtonOkClicked}> OK </button>
                </div>)}
            </div>
        );
    }
}

export default Profile;