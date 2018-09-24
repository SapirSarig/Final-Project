import React, { Component } from 'react';
import RegisterService from "../../services/register/RegisterService";
import UserServicr from "../../services/apis/UserService";
import UserService from '../../services/apis/UserService';
import { Route, Redirect } from 'react-router';

export default class ResetPassword extends Component {
    userService;
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.state = {
            Password: "",
            ConfirmPassword: "",
            errors: {
                Password: "",
                ConfirmPassword: ""
            },
            authUser: "",
            authUserValid: true
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.submitClicked = this.submitClicked.bind(this);

    }

    componentDidMount() {
        const { location } = this.props;
        const { search } = location;
        const urlParams = new URLSearchParams(search);
        const authUser = urlParams.get('authUser');
        if (authUser) {
            this.setState({ authUser });
        }
        else {
            this.setState({ authUserValid: false });
        }

    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        this.checkValidation(name, value);

    }

    checkValidation(fieldName, value) {
        let { Password, errors } = this.state;

        let errorMessage = "";
        if (fieldName === "Password") {
            errorMessage = RegisterService.passwordValidation(value);
        } else if (fieldName === "ConfirmPassword") {
            errorMessage = RegisterService.confirmValidation(value, Password);
        }
        errors[fieldName] = errorMessage;
        this.setState({
            errors
        });

    }

    submitClicked() {
        const { authUser, Password } = this.state;
        this.userService.resetPasswordToUser(authUser, Password)
    }

    render() {
        let { Password, ConfirmPassword, errors, authUserValid } = this.state;
        return (
            <div className="Container">
                {authUserValid ?
                    <div>
                        <div className="passwordContainer">
                            <span > New Password</span>
                            <input type="password" placeholder="Min 6 chars, at least one number and one lower case English letter" name="Password" value={Password} onChange={this.handleInputChange} />
                            <span className="errorInput" > {errors["Password"] && errors["Password"]} </span>
                        </div>

                        <div className="confirmPasswordContainer">
                            <span > Confirm Password  </span>
                            <input type="password" name="ConfirmPassword" value={ConfirmPassword} onChange={this.handleInputChange} />
                            <span className="errorInput" > {errors["ConfirmPassword"] && errors["ConfirmPassword"]} </span>
                        </div>

                        <button onClick={this.submitClicked}>Submit</button>
                    </div> : <Redirect to={{
                        pathname: '/'
                        // state: { userInfo }
                    }} />}
            </div>
            
        )
}
}