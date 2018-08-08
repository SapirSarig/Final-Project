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
                    
                    <Link className="signUpStar" to="/starSignUp">
                    <button>
                        Sign up as a star
                    </button>
                    </Link>

                    <Link className="BusinessSignUp" to="/businessSignUp">
                    <button className="BusinessSignUp">
                        Sign up as a business owner
                    </button>
                    </Link>
                </div>
            </div>
                
        );
    }
}

export default Home;