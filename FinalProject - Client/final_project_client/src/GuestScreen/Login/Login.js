import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends Component {

    render()
    {
        return(
            <div className="loginWrapper">
                <div className="insideLoginWrapper">
                    {/* this is should be in another component */}
                    
                    <Link className="login" to="/loginPage">
                        <button>
                            Login
                        </button>
                    </Link>
                    
                    <Link className="signUpStar" to="/StarSignUpScreen">
                    <button>
                        Sign up as a star
                    </button>
                    </Link>

                    <Link className="BusinessSignUp" to="/BusinessSignUpScreen">
                    <button className="BusinessSignUp">
                        Sign up as a business man 
                    </button>
                    </Link>
                </div>
            </div>
                
        );
    }
}

export default Login;