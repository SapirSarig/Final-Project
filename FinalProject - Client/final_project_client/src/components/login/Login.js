import React, { Component } from 'react';
import UserService from '../../services/apis/UserService';
import RegisterService from '../../services/register/RegisterService';
import StringUtil from '../../utils/StringUtil';
import './Login.css';
import FacebookLogin from 'react-facebook-login';
import { Route, Redirect } from 'react-router';

const initialState = {
    name: "",
    password: "",
    errors: { name: "", password: "" },
    rememberMe: false,
    loggedIn: false,
    externalLogin: false,
    loggedUserInfo: {}
};

class Login extends Component {
    userService;

    constructor(props) {
        super(props);
        const userLogin = JSON.parse(localStorage.getItem('userLogin'));
        if (userLogin && userLogin.name && userLogin.password) {
            initialState.name = userLogin.name;
            initialState.password = userLogin.password;
            initialState.rememberMe = true;
        }

        initialState.errors = { name: "", password: "" };
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
        const { password, name } = this.state;
        if (typeof (Storage) !== "undefined") { //don't save the password here!!
            localStorage.setItem("userLogin", JSON.stringify({ name, password }));
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
        const { errors, password, name } = this.state;
        this.deleteDataFromLocalStorage();

        let errorMessage;
        if (fieldName === "name") {
            errorMessage = RegisterService.nameValidation(value);
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
        const { errors, name, password } = this.state;
        let isValidInputs;
        isValidInputs = (StringUtil.isEmptyString(RegisterService.nameValidation(name)))
            && (StringUtil.isEmptyString(RegisterService.passwordValidation(password))); //init, check all fields

        return isValidInputs;
    }

    loginUser(event) {
        this.userService.loginUser(this.state).then(req => {
            if (req) {
                this.setState(initialState);
                //routing
                alert(`Hello ${req.name}`);
            }
        });
    }

    responseFacebook(response) {
        let isLogged = this.saveLoginTokenLocalStorage(response);
        //if(isLogged && this.checkIfUserSignUp(response.email))
        //false 
        if (isLogged) {
            this.setState({ loggedIn: true, externalLogin: true, loggedUserInfo: response })

            console.log("logged");
        }
    }

    componentClicked(res) {
        console.log(res);
    }

    render() {
        const { name, password, rememberMe, errors, loggedIn, loggedUserInfo, externalLogin } = this.state;

        return (
            loggedIn ? <Redirect to={{
                pathname: '/SignUp',
                state: { loggedUserInfo, externalLogin }
            }} /> :
                (<div className="Container">
                    <span> Name </span>
                    <input type="text" name="name" value={name} onChange={this.handleInputChange} />
                    {<span className="errorInput">{errors["name"] && errors["name"]}</span>}

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
                    <span>Forgot my username/ password </span>
                </div>)
        );
    }

}

export default Login;