import React, { Component } from 'react';
import VerifyQuestions from "../../common/verifyQuestions/VerifyQuestions";
import UserService from "../../services/apis/UserService";
import ValidationUtil from '../../utils/ValidationUtil';
import RegisterService from '../../services/register/RegisterService';
import { Route, Redirect } from 'react-router';

export default class ForgotPassword extends Component {
    userService;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            Question1: "",
            Question2: "",
            emailError: "",
            emailSent: false,
            errors: {
                Question1: "",
                Question2: ""
            },
        }
        this.userService = new UserService();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        if (name === "email") {
            let errorMessage = RegisterService.emailValidation(value);
            this.setState({
                emailError: errorMessage
            });
        }
    }

    submitClicked() {
        const { email, Question1, Question2 } = this.state;
        let { emailSent } = this.state;
        let obj = {
            "Email": email,
            "Question1": Question1,
            "Question2": Question2
        }
        this.userService.SendLinkToResetPassword(obj).then(req => {
            //console.log(req);
            if (req) {
                //this.setState({ signUpOk: true });
                alert("A link to reset your password was succefully sent to your email!");
                this.setState({
                    emailSent: true
                });

            }
            else {
                alert("Server Error");
            }

            //this.clearForm();
            //this.props.history.push("/login")
        });
    }

    isEmailValid() {
        const { email } = this.state;
        if (ValidationUtil.validateEmail(email)) {
            return true;
        }

        return false;


    }
    render() {
        let { email, Question1, Question2, emailError, emailSent, errors } = this.state;
        return (
            <div>
                {!emailSent ?
                    <div>
                        <span > Email* </span>
                        <input type="email" name="email" value={email} onChange={this.handleInputChange} />
                        <VerifyQuestions handleInputChange={this.handleInputChange} question1={Question1} question2={Question2} signUp={true} errors={errors} />
                        <button className={`${this.isEmailValid() ? "" : "disableElement"}`} onClick={this.submitClicked}>Submit</button>
                        <span className="errorInput" > {emailError} </span>
                    </div> :
                    <Redirect to={{
                        pathname: '/'
                        // state: { userInfo }
                    }} />}
            </div>
        );
    }
}