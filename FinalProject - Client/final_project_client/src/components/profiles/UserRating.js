
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserRating.css';

var $ = require("jquery");

class UserRating extends Component {

    constructor(props) {
        super(props);
        this.color = this.color.bind(this);
        this.noColor = this.noColor.bind(this);
        this.state = {
            starWasClicked: false,
            starNum: 0
        }
    }

    color(num, clicked) {
        if (!this.state.starWasClicked) {
            console.log("color - function");
            var starClass = "star";
            if (num >= 1) {
                starClass = "star" + 1;
                $('.' + starClass).removeClass("noColorStar");
                $('.' + starClass).addClass("coloredStar");

            }
            if (num >= 2) {
                starClass = "star" + 2;
                $('.' + starClass).removeClass("noColorStar");
                $('.' + starClass).addClass("coloredStar");

            }
            if (num >= 3) {
                starClass = "star" + 3;
                $('.' + starClass).removeClass("noColorStar");
                $('.' + starClass).addClass("coloredStar");

            }
            if (num >= 4) {
                starClass = "star" + 4;
                $('.' + starClass).removeClass("noColorStar");
                $('.' + starClass).addClass("coloredStar");

            }
            if (num >= 5) {
                starClass = "star" + 5;
                $('.' + starClass).removeClass("noColorStar");
                $('.' + starClass).addClass("coloredStar");
            }

            if (clicked) {
                this.setState({ starWasClicked: clicked, starNum: num });
                this.props.addStarToUserReviews(num);
            }
        }
    }

    noColor(num) {
        if (!this.state.starWasClicked) {
            console.log("NOcolor - function");
            var starClass;
            if (num >= 1) {
                starClass = "star" + 1;
                $('.' + starClass).removeClass("coloredStar");
                $('.' + starClass).addClass("noColorStar");
            }
            if (num >= 2) {
                starClass = "star" + 2;
                $('.' + starClass).removeClass("coloredStar");
                $('.' + starClass).addClass("noColorStar");
            }
            if (num >= 3) {
                starClass = "star" + 3;
                $('.' + starClass).removeClass("coloredStar");
                $('.' + starClass).addClass("noColorStar");
            }
            if (num >= 4) {
                starClass = "star" + 4;
                $('.' + starClass).removeClass("coloredStar");
                $('.' + starClass).addClass("noColorStar");
            }
            if (num >= 5) {
                starClass = "star" + 5;
                $('.' + starClass).removeClass("coloredStar");
                $('.' + starClass).addClass("noColorStar");
            }
        }
    }

    render() {
        const { user, loggedUser } = this.props;
        const isSameUser = (user.Name === loggedUser.Name);

        if (user && user.NumOfVoters > 0) {
            let width1 = (user.OneStar / user.NumOfVoters) * 100 + "%";
            var style1 = {
                width: width1,
            };
            let width2 = (user.TwoStars / user.NumOfVoters) * 100 + "%";
            var style2 = {
                width: width2,
            };
            let width3 = (user.ThreeStars / user.NumOfVoters) * 100 + "%";
            var style3 = {
                width: width3,
            };
            let width4 = (user.FourStars / user.NumOfVoters) * 100 + "%";
            var style4 = {
                width: width4,
            };
            let width5 = (user.FiveStars / user.NumOfVoters) * 100 + "%";
            var style5 = {
                width: width5,
            };
        }

        return (
            <div>
                <span className="heading">Rating</span>
                {isSameUser ? <div></div> :
                    <div>
                        <img onClick={() => this.color(1, true)} onMouseOver={() => this.color(1, false)} onMouseOut={() => this.noColor(1)} className="noColorStar star1"></img>
                        <img onClick={() => this.color(2, true)} onMouseOver={() => this.color(2, false)} onMouseOut={() => this.noColor(2)} className="noColorStar star2"></img>
                        <img onClick={() => this.color(3, true)} onMouseOver={() => this.color(3, false)} onMouseOut={() => this.noColor(3)} className="noColorStar star3"></img>
                        <img onClick={() => this.color(4, true)} onMouseOver={() => this.color(4, false)} onMouseOut={() => this.noColor(4)} className="noColorStar star4"></img>
                        <img onClick={() => this.color(5, true)} onMouseOver={() => this.color(5, false)} onMouseOut={() => this.noColor(5)} className="noColorStar star5"></img>
                    </div>
                }
                {user &&
                    <div>
                        <div>{user.RateAvg} average based on {user.NumOfVoters} reviews.</div>
                        <br />
                        <div className="row">
                            <div className="side">
                                <div>5 stars</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-5" style={style5}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{user.FiveStars}</div>
                            </div>
                            <div className="side">
                                <div>4 stars</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-4" style={style4}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{user.FourStars}</div>
                            </div>
                            <div className="side">
                                <div>3 stars</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-3" style={style3}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{user.ThreeStars}</div>
                            </div>
                            <div className="side">
                                <div>2 stars</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-2" style={style2}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{user.TwoStars}</div>
                            </div>
                            <div className="side">
                                <div>1 star</div>
                            </div>
                            <div className="middle">
                                <div className="bar-container">
                                    <div className="bar-1" style={style1}></div>
                                </div>
                            </div>
                            <div className="side right">
                                <div>{user.OneStar}</div>
                            </div>
                        </div>
                    </div>}
            </div>

        );
    }
}

export default UserRating;