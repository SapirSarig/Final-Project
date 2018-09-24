import React, { Component } from 'react';
import UserService from '../../services/apis/UserService';
import RegisterService from '../../services/register/RegisterService';
import StringUtil from '../../utils/StringUtil';
import './Login.css';
import FacebookLogin from 'react-facebook-login';
import { Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import LocalStorageUtil from '../../utils/LocalStorageUtil';
import SessionStorageUtil from '../../utils/SessionStorageUtil';

const initialState = {
    email: "",
    password: "",
    errors: { email: "", password: "" },
    rememberMe: false,
    loggedIn: false,
    user: {},
    externalLogin: false,
    clickOnLoginFaceBook: false
};

class Login extends Component {
    userService;

    constructor(props) {
        super(props);
        const userLogin = JSON.parse(localStorage.getItem('userLogin'));
        // if (userLogin && userLogin.name && userLogin.password) {
        //     initialState.name = userLogin.name;
        //     initialState.password = userLogin.password;
        //     initialState.rememberMe = true;
        // }

        initialState.errors = { email: "", password: "" };
        this.state = initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.componentClicked = this.componentClicked.bind(this);
        this.userService = new UserService();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if (target.type === "checkbox" && value === true) { //remember me
            initialState.rememberMe = true;
        }
        else if (target.type === "checkbox" && value === false) {
            initialState.rememberMe = false;
        }
        else {
            this.checkValidation(name, value);
        }
    }

    checkValidation(fieldName, value) {
        const { errors, password, email } = this.state;

        let errorMessage;
        if (fieldName === "email") {
            errorMessage = RegisterService.emailValidation(value);
        }
        else if (fieldName === "password") {
            errorMessage = RegisterService.passwordValidation(value);
        }
        errors[fieldName] = errorMessage;
        this.setState({
            errors,
            rememberMe: false
        });
    }

    isAllValid() {
        const { errors, email, password } = this.state;
        let isValidInputs;
        isValidInputs = (StringUtil.isEmptyString(RegisterService.emailValidation(email)))
            && (StringUtil.isEmptyString(RegisterService.passwordValidation(password))); //init, check all fields

        return isValidInputs;
    }

    loginUser(event) {
        const { rememberMe, email, password } = this.state;
        const info = {
            "Email": email,
            "Password": password
        };
        this.userService.loginUser(info).then(req => {
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {

                    this.setState({
                        loggedIn: true,
                        user: req
                    }, () => {
                        if (rememberMe) {
                            //SessionStorageUtil.RemoveLoggedUser();
                            LocalStorageUtil.SaveLoggedUser(req);
                        } else {
                            //LocalStorageUtil.RemoveLoggedUser();
                            SessionStorageUtil.SaveLoggedUser(req);
                        }
                    });
                }

            } else {
                alert("Validation Error");
            }
        })
    }

    responseFacebook(response) {
        const { clickOnLoginFaceBook } = this.state;
        if (clickOnLoginFaceBook && response.accessToken) {
            //if(isLogged && this.checkIfUserSignUp(response.email))
            //false 
            this.userService.loginExternalUser(response).then(req => {
                if (req) {
                    if (req.Message) {
                        alert(req.Message);
                    }
                    else {
                        LocalStorageUtil.SaveLoggedUser(req);
                        this.setState({ loggedIn: true, user: req })
                    }

                }
                else {
                    LocalStorageUtil.RemoveLoggedUser();
                    this.setState({ externalLogin: true, user: response })
                }
            });

        }
    }

    componentClicked(res) {
        this.setState({ clickOnLoginFaceBook: true });
    }

    render() {
        const { email, password, rememberMe, errors, loggedIn, externalLogin, user } = this.state;
        console.log(user);
        return (
            externalLogin ?
                <Redirect to={{
                    pathname: '/signUp',
                    state: { user, externalLogin }
                }} /> :
                loggedIn ? (user.Type === "Social Influencer") ?
                    <Redirect to={{
                        pathname: '/influencerHomePage',
                        state: { user }
                    }} /> :
                    <Redirect to={{
                        pathname: '/businessHomePage',
                        state: { user }
                    }} /> :
                    (<div className="Container">
                        <span> email </span>
                        <input type="text" name="email" value={email} onChange={this.handleInputChange} />
                        {<span className="errorInput">{errors["email"] && errors["email"]}</span>}

                        <span> Password </span>
                        <input type="password" name="password" value={password} onChange={this.handleInputChange} />
                        {<span className="errorInput">{errors["password"] && errors["password"]}</span>}

                        <input type="button" value="Login" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.loginUser} />
                        <FacebookLogin
                            appId="271386353659285"
                            autoLoad={true}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook} />
                        <div>
                            <input type="checkbox" checked={rememberMe} onChange={this.handleInputChange} name="rememberMe" />
                            <span>Remember me</span>
                        </div>
                        <Link className="forgotPassword" to="/forgotPassword">
                            <button className="forgotPasswordBtn">
                                Forgot My Password
                            </button>
                        </Link>
                    </div>)
        );
    }

}

export default Login;