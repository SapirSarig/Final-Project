import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {

    render()
    {
        return(
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

                    <Link className="profile" to="/profile">
                    <button className="btn">
                        Profile
                    </button>
                    </Link>
                </div>
            </div>
                
        );
    }
}

export default Home;