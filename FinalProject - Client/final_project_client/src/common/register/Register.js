import React, { Component } from 'react';
import './Register.css';
import RegisterService from '../../services/register/RegisterService';
import StringUtil from '../../utils/StringUtil';

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmMail: "",
    errors: { name: "", email: "", password: "", confirmPassword:"", confirmMail:"" }
};

class Register extends Component {
    constructor(props) {
        super(props);
        initialState.name = "";
        initialState.email = "";
        initialState.password = "";
        initialState.confirmPassword = "",
        initialState.errors = { name: "", email: "", password: "", confirmPassword:"", confirmMail:"" };

        this.state = initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);
        this.isAllValid = this.isAllValid.bind(this);
       // this.isPasswordSet = this.isPasswordSet.bind(this);
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
        const { errors, password, email } = this.state;

        let errorMessage;
        if (fieldName === "name") {
            errorMessage = RegisterService.nameValidation(value);
        }
        else if (fieldName === "email") {
            errorMessage = RegisterService.emailValidation(value);
        }
        else if (fieldName === "password") {
            errorMessage = RegisterService.passwordValidation(value);
        }
        else if (fieldName === "confirmPassword") {
            errorMessage = RegisterService.confirmValidation(value, password);
        }
        else if(fieldName === "confirmMail"){
            errorMessage = RegisterService.confirmValidation(value, email);
        }

        errors[fieldName] = errorMessage;
        this.setState({
            errors
        });
    }

    onCreateUser() {
        const { name, email, password, confirmPassword, confirmMail } = this.state;
        const { onCreateUser } = this.props;
        //if there are no validtion errors
        onCreateUser({ name, email, password, confirmPassword, confirmMail });
    }

    isAllValid() {
        const { isAllValidCustome } = this.props;
        const { errors, email, name, password, confirmPassword, confirmMail } = this.state;
        let isValidInputs = isAllValidCustome ? isAllValidCustome() : true;

        isValidInputs = (StringUtil.isEmptyString(RegisterService.nameValidation(name)))
            && (StringUtil.isEmptyString(RegisterService.emailValidation(email)))
            && (StringUtil.isEmptyString(RegisterService.passwordValidation(password)))
            && (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmPassword,password)))
            && (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmMail,email))); //init, check all fields

        return isValidInputs;
    }

    // isPasswordSet(password){
    //     return StringUtil.isEmptyString(password);
    // }

    render() {
        const { children } = this.props;
        const { name, email, confirmMail, password, confirmPassword, errors } = this.state;
        return (
            <div className="Container">
                <span> Name </span>
                <input type="text" name="name" value={name} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["name"] && errors["name"]}</span>

                {children && children}
                
                <span> Email </span>
                <input type="email" name="email" value={email} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["email"] && errors["email"]}</span>

                <span> Confirm Email </span>
                <input type="email" name="confirmMail" value={confirmMail} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["confirmMail"] && errors["confirmMail"]}</span>

                <span> Password </span>
                <input type="password" name="password" value={password} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["password"] && errors["password"]}</span>
                
                <span> Confirm Password </span>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["confirmPassword"] && errors["confirmPassword"]}</span>
                
                <input type="button" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.onCreateUser} value="Sign up!" />
            </div>
        );
    }
}

export default Register;