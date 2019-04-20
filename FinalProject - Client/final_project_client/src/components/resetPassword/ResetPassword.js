import React, { Component } from 'react';
import RegisterService from "../../services/register/RegisterService";
import UserService from '../../services/apis/UserService';
import { Redirect } from 'react-router';
import LayoutButton from '../../common/layoutButton/layoutButton';
import PasswordInput from '../passwordInput/passwordInput';
import './ResetPassword.css';
import StringUtil from '../../utils/StringUtil';

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
            authUserValid: true,
            passwordUpdated: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
        this.isAllValid = this.isAllValid.bind(this);
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
        this.userService.resetPasswordToUser(authUser, Password).then(req => {
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {
                    this.setState({ passwordUpdated: true })
                }

            }
            else {
                alert("Server Error");
            }
        });
    }

    isAllValid(){
        const {Password, ConfirmPassword} = this.state;
        if ((StringUtil.isEmptyString(RegisterService.passwordValidation(Password))) &&
        (StringUtil.isEmptyString(RegisterService.confirmValidation(ConfirmPassword, Password)))) {
            return true;
        }
        return false;
    }

    render() {
        let { Password, ConfirmPassword, errors, authUserValid, passwordUpdated } = this.state;
        return (
            <div className="Container">
                {(authUserValid && !passwordUpdated) ?
                    <div>
                        <PasswordInput name="Password" style={{ width: '75%' }} placeholder="Min 6 chars, one number and one lower case letter" value={Password} onChange={this.handleInputChange} label={"New Password "} />
                        <span className="errorInput" > {errors["Password"] && errors["Password"]} </span>

                        <PasswordInput name="ConfirmPassword" style={{ width: '75%' }} value={ConfirmPassword} onChange={this.handleInputChange} label={"Confirm Password "} />
                        <span className="errorInput" > {errors["ConfirmPassword"] && errors["ConfirmPassword"]} </span>

                        <div className="btnContainer">
                            <div className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.submitClicked}>
                                <LayoutButton text="Submit" />
                            </div>
                        </div>
                    </div> : <Redirect to={{
                        pathname: '/'
                        // state: { userInfo }
                    }} />}
            </div>

        )
    }
}