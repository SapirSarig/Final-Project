import React, { Component } from 'react';
import StarProfile from './StarProfile';
import UserService from '../../services/apis/UserService';
// import NavToggle from '../navToggle/navToggle';
import SessionStorageUtil from '../../utils/SessionStorageUtil';
import Message from '../negotiation/Message';
import UserRating from './UserRating';
import './profile.css';
import FixedHeader from '../../common/fixedHeader/fixedHeader';

class Profile extends Component {
    userService;

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonOkClicked = this.handleButtonOkClicked.bind(this);
        this.userService = new UserService();
        this.addStarToUserReviews = this.addStarToUserReviews.bind(this);
        this.checkIsReviewedByUser = this.checkIsReviewedByUser.bind(this);
        this.checkIsRatedByUser = this.checkIsRatedByUser.bind(this);
        this.state = {
            user: {},
            review: "",
            okDisabled: true,
            loggedUser: SessionStorageUtil.GetLoggedUser(),
            isRatedByUserVar: false,
            isReviewedByUserVar: false,
        }

        this.isUserHasPic = this.isUserHasPic.bind(this);
    }

    componentDidMount() {
        let { user, location } = this.props;
        if (!user && location) {
            user = location.state.user;
        }

        // this.setState({
        //     user
        // })

        this.userService.getUserById(user.Id).then(req => {
            if (req) {
                if (req.message) {
                    alert(req.message);
                }
                else {
                    this.setState({ user: req });
                }
            }
            else {
                alert("Server error!");
            }
        })

        let rateId, reviewId;

        rateId = setInterval(this.checkIsRatedByUser, 2000);
        reviewId = setInterval(this.checkIsReviewedByUser, 2000);
        this.setState({ rateIntervalId: rateId });
        this.setState({ reviewIntervalId: reviewId });
        this.checkIsRatedByUser();
        this.checkIsReviewedByUser();
    }

    checkIsRatedByUser() {
        this.userService.isRatedByUserId(this.state.user.Id, this.state.loggedUser.Id).then(req => {
            if (req.message) {
                alert(req.message);
            }
            else {
                if (req === true) {
                    clearInterval(this.state.rateIntervalId);
                    this.setState({ isRatedByUserVar: req });
                }
            }

        });
    }

    checkIsReviewedByUser() {
        this.userService.isReviewedByUserId(this.state.user.Id, this.state.loggedUser.Id).then(req => {
            if (req.message) {
                alert(req.message);
            }
            else {
                if (req === true) {
                    clearInterval(this.state.reviewIntervalId);
                    this.setState({ isReviewedByUserVar: req });
                }
            }
        });
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        //let { okDisabled } = this.state;

        this.setState({
            [name]: value,
            okDisabled: false
        });
    }

    addStarToUserReviews(starNum) {
        this.userService.AddStar(this.state.user.Id, starNum, this.state.loggedUser.Id).then(req => {
            if (req) {
                if (req.message) {
                    alert(req.message);
                }
                else {
                    this.setState({ user: req });
                    clearInterval(this.state.rateIntervalId);
                    this.setState({ isRatedByUserVar: true });
                }
            }
            else {
                alert("Server error!");
            }
        })
    }

    handleButtonOkClicked(event) {
        const { user } = this.state;
        const target = event.target;
        const value = target.value;
        //const name = target.name;
        const FromUser = this.state.loggedUser;
        const currTime = Date().split("GMT");

        let obj = {
            "Text": value,
            "From": FromUser.Name,
            "ByUserId": FromUser.Id,
            "TimeSent": currTime[0]
        }

        this.userService.AddReviewToUser(user.Id, obj).then(req => {
            if (req) {
                user.Reviews.push(obj);
                this.setState({ user: req });
                clearInterval(this.state.reviewIntervalId);
                this.setState({ isReviewedByUserVar: true });
            }
            else {
                alert("Server Error");
            }
        }
        );
        let inputelem = document.getElementById("review");
        inputelem.value = null;
        inputelem.disabled = true;
        let okButton = document.getElementById("okButton");
        okButton.disabled = true;
    }

    isUserHasPic(user){
        return (user && user.Picture && user.Picture !== "string" && user.Picture !== "no pic")
    }

    render() {
        const { location } = this.props;
        const { user } = this.state;
        let { okDisabled, isRatedByUserVar, isReviewedByUserVar } = this.state;
        const isOkDisabled = (location && location.state.okDisabled) || okDisabled;

        return (
            <div>
                {/* <NavToggle /> */}
                <FixedHeader />
                {user && (<div className="profileContainer">
                    <div className="rightSideWrapper">
                        <div className="profileImgWrapper">                            
                            {this.isUserHasPic(user) ?
                                <img alt="userPicture" src={user.Picture} className="profliePic"/> :
                                <svg width="32" height="32" viewBox="0 0 32 32" className="userProfileIcon">
                                    <path d="M14 0c7.734 0 14 6.266 14 14 0 7.688-6.234 14-14 14-7.75 0-14-6.297-14-14 0-7.734 6.266-14 14-14zM23.672 21.109c1.453-2 2.328-4.453 2.328-7.109 0-6.609-5.391-12-12-12s-12 5.391-12 12c0 2.656 0.875 5.109 2.328 7.109 0.562-2.797 1.922-5.109 4.781-5.109 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c2.859 0 4.219 2.312 4.781 5.109zM20 11c0-3.313-2.688-6-6-6s-6 2.688-6 6 2.688 6 6 6 6-2.688 6-6z">
                                    </path>
                                </svg>
                            }
                        </div>
                        <span className="name"> {user.Name} </span>
                    </div>

                    <div className="interestsWrapper">
                        <span className="interestsTitle"> Interests: </span>
                        {user.Interests && user.Interests.length > 0 ?
                            <div className="interests">
                                {user.Interests.map(interest =>
                                    (<div> {interest.Value} </div>))}
                            </div> : <div>No Interests To Show!</div>}
                    </div>

                    <div className="descriptionWrapper">
                        <span> Description: </span>
                        <span> {user.Description} </span>
                    </div>

                    {
                        user.Type === "Business Owner" &&
                        <div>
                            <span> Website Link: </span>
                            {/* <a href={user.WebsiteLink}>{user.CompanyName} </a> */}
                            <a className="websiteLink" href={user.WebsiteLink.includes("http")? user.WebsiteLink : `https://${user.WebsiteLink}`}>{user.CompanyName} </a>

                        </div>
                    }

                    {user.Type === "Social Influencer" ?
                        <StarProfile dateOfBirth={user.DateOfBirth} socialNetworks={user.SocialNetworks} /> : null}

                    <UserRating user={user} loggedUser={this.state.loggedUser} addStarToUserReviews={this.addStarToUserReviews} isRatedByUser={isRatedByUserVar} />

                    {(user.Name === this.state.loggedUser.Name || isReviewedByUserVar) ? <div></div> :
                        <div>
                            <br />
                            <div> Write A Review: </div>
                            <textarea id="review" type="text" rows="2" name="review" onChange={this.handleInputChange} className="reviewInput" />
                            <div>
                                <button id="okButton" className={!isOkDisabled ? "reviewOkBtn" + " " + "enable" : "reviewOkBtn"} value={!!document.getElementById("review") ? document.getElementById("review").value : null} disabled={isOkDisabled} onClick={this.handleButtonOkClicked}> OK </button>
                            </div>
                        </div>}

                    <div className="reviewsWrapper">
                        <span> Reviews: </span>
                        {user.Reviews && user.Reviews.length > 0 ?
                            <div className="reviews">
                                {user.Reviews.map(newReview =>
                                    (<Message key={newReview.Id} message={newReview} isReview={true} />))}
                            </div> : <div>No Reviews Yet!</div>}
                    </div>
                </div>)}
            </div>
        );
    }
}

export default Profile;