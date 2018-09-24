import React, { Component } from 'react';
import UserService from '../../services/apis/UserService';
import RegisterService from '../../services/register/RegisterService';
import StringUtil from '../../utils/StringUtil';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import './Login.css';
import FacebookLogin from 'react-facebook-login';
import { Route, Redirect } from 'react-router';

import PasswordInput from '../passwordInput/passwordInput';
import LayoutButton from '../../common/layoutButton/layoutButton';

const initialState = {
    email: "",
    password: "",
    errors: { email: "", password: "" },
    rememberMe: false,
    loggedIn: false,
    loggedUser: {},
    externalLogin: false
};

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
    }
});

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
        this.saveDataOnLocalStorage = this.saveDataOnLocalStorage.bind(this);
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
            this.saveDataOnLocalStorage();
        }
        else if (target.type === "checkbox" && value === false) {
            initialState.rememberMe = false;
            this.deleteDataFromLocalStorage();
        }
        else {
            this.checkValidation(name, value);
        }
    }

    saveDataOnLocalStorage() {
        const { password, email } = this.state;
        if (typeof (Storage) !== "undefined") { //don't save the password here!!
            localStorage.setItem("userLogin", JSON.stringify({ email, password }));
        } else {
            alert("No Web Storage support");
        }

    }

    saveLoginTokenLocalStorage(userLogin) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            return true;
        } else {
            alert("No Web Storage support");
        }
        return false;
    }

    deleteDataFromLocalStorage() {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("userLogin");
        } else {
            alert("No Web Storage support");
        }
    }

    checkValidation(fieldName, value) {
        const { errors, password, email } = this.state;
        this.deleteDataFromLocalStorage();

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
        this.userService.loginUser(this.state).then(req => {
            if (req) {
                //routing
                //alert(`Hello ${req.Name}`);
                this.setState({
                    loggedIn: true,
                    loggedUser: req
                });
            } else {
                alert("Validation Error");
            }
        })
    }

    responseFacebook(response) {
        if (response.status !== "unknown" && response.messae !== "response is not defined") {
            let isLogged = this.saveLoginTokenLocalStorage(response);
            //if(isLogged && this.checkIfUserSignUp(response.email))
            //false 
            if (isLogged) {
                this.userService.loginExternalUser(response).then(req => {
                    if (req) {
                        this.setState({ loggedIn: true, loggedUser: req })
                    } else {
                        this.setState({ externalLogin: true, loggedUser: response })
                    }
                });
            }
        }
    }

    componentClicked(res) {
        console.log(res);
    }

    render() {
        const { classes } = this.props;
        const { email, password, rememberMe, errors, loggedIn, loggedUserInfo, externalLogin, loggedUser } = this.state;
        console.log(loggedUser);
        return (
            externalLogin ?
                <Redirect to={{
                    pathname: '/SignUp',
                    state: { loggedUser, externalLogin }
                }} /> :
                loggedIn ? (loggedUser.type === 0) ?
                    <Redirect to={{
                        pathname: '/InfluencerHomePage',
                        state: { loggedUser }
                    }} /> :
                    <Redirect to={{
                        pathname: '/businessHomePage',
                        state: { loggedUser }
                    }} /> :
                    (<div className="Container">
                        <div className="wrapper">
                            <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                value={email}
                                name="email"
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                            {/* <input type="text" name="email" value={email} onChange={this.handleInputChange} /> */}
                            {<span className="errorInput">{errors["email"] && errors["email"]}</span>}

                            <PasswordInput name="password" value={password} onChange={this.handleInputChange} label="Password"/>
                            {/* <input type="password" name="password" value={password} onChange={this.handleInputChange} /> */}
                            {<span className="errorInput">{errors["password"] && errors["password"]}</span>}

                            <div className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.loginUser}>
                                <LayoutButton text="Login" />
                            </div>
                            <span className="or">Or</span>
                            {/* <input type="button" value="Login" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.loginUser} /> */}
                            <FacebookLogin
                                appId="271386353659285"
                                autoLoad={true}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                                className="facebook-login"
                                buttonText="Connect With Facebook" />
                            <div className="rememberMe">
                                <input type="checkbox" checked={rememberMe} onChange={this.handleInputChange} name="rememberMe" />
                                <span>Remember me</span>
                            </div>
                            <span>Forgot my username/ password </span>
                        </div>
                    </div>)
        );
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);