import React, { Component } from 'react';
import './StarSignUp.css'
import Register from '../../common/register/Register';
import UserService from '../../services/apis/UserService';
import StarSignUpService from '../../services/register/StarSignUpService';

const initialState = {
    dateOfBirth: "",
    errors: { dateOfBirth: "" }
};

class StarSignUpScreen extends Component {
    userService;

    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createUser = this.createUser.bind(this);
        this.onCreateUser = this.onCreateUser.bind(this);
        this.isAllValidCustome = this.isAllValidCustome.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.userService = new UserService();
        initialState.dateOfBirth = "";
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

    checkValidation(name, value) {
        const { errors } = this.state;
        let errorMessage = StarSignUpService.dateValidation(value);
        errors[name] = errorMessage;
        this.setState({
            errors
        });
    }

    onCreateUser(registerObj) {
        const userInfo = Object.assign({}, registerObj, this.state);
        console.log(userInfo);

        this.userService.createUser(userInfo).then(req => {
            console.log(req);
            //this.clearForm();
            //this.props.history.push("/login")
        });
    }

    isAllValidCustome(name, value) {
        let errorMessage = StarSignUpService.dateValidation(value);
        return errorMessage == undefined;
    }

    createUser(event) {
        this.userService.createUser(this.state).then(req => {
            console.log(req);
            //this.clearForm();
            //this.props.history.push("/login")
        });
    }

    render() {
        const { dateOfBirth,errors } = this.state;

        return (
            <div className="Container">

                <Register onCreateUser={this.onCreateUser} isAllValidCustome={this.isAllValidCustome}>
                    <span> Date Of Birth </span>
                    <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["dateOfBirth"]}</span>
                </Register>
            </div>
        );
    }
}

export default StarSignUpScreen;