import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="loginWrapper">
                <div className="insideLoginWrapper">
                    {/* this is should be in another component */}

                    <Link className="login" to="/login">
                        <button>
                            Login
                        </button>
                    </Link>

                    <Link className="signUp" to="/SignUp">
                        <button className="BusinessSignUp">
                            Sign Up
                    </button>
                    </Link>

                    <Link className="auction" to="/auction">
                        <button className="auctionBtn">
                            auction
                    </button>
                    </Link>

                    <Link className="starOffer" to="/starOffer">
                        <button className="starOfferBtn">
                            starOffer
                        </button>
                    </Link>

                    <Link className="allOffers" to="/allOffers">
                        <button className="allOffersBtn">
                            allOffers
                        </button>
                    </Link>

                    <Link className="myAuctions" to="/myAuctions">
                        <button className="myAuctions">
                            myAuctions
                        </button>
                    </Link>

                    <Link className="profile" to="/profile">
                        <button className="btn">
                            Profile
                        </button>
                    </Link>

                    <Link className="influencerHomePage" to="/influencerHomePage">
                        <button className="influencerHomePageBtn">
                            influencerHomePage
                        </button>
                    </Link>

                    <Link className="negotiationPage" to="/NegotiationPage">
                        <button>
                            NegotiationPage
                        </button>
                    </Link>

                    <Link className="offersPerAuctionPage" to="/offersPerAuctionPage">
                        <button>
                        offers Per Auction Page
                        </button>
                    </Link>
                    

                </div>
            </div>

        );
    }
}

export default Home;