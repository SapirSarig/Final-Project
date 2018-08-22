import React, { Component } from 'react';
import './Register.css';
import RegisterService from '../../services/register/RegisterService';
import StringUtil from '../../utils/StringUtil';
import InfluencerRegister from './InfluencerRegister';
import BusinessRegister from './BusinessRegister';
import Interests from "./Interests";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmMail: "",
    type: "Social Influencer",
    chooseTypeState: {},
    interests: [],
    description: "",
    errors: { name: "", email: "", password: "", confirmPassword: "", confirmMail: "" }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createUserClicked = this.createUserClicked.bind(this);
        this.isAllValid = this.isAllValid.bind(this);
        this.updateChooseTypeStateObject = this.updateChooseTypeStateObject.bind(this);
        // this.isPasswordSet = this.isPasswordSet.bind(this);
    }

    componentDidMount() {
        const { location } = this.props;
        if (location && location.state) {
            const { loggedUserInfo } = location.state;
            if (loggedUserInfo) {
                const { email, name } = loggedUserInfo;
                this.setState({ email, name })
            }
        }
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { interests } = this.state;

        if (name === "Interests") {
            value && interests.push(value);

            this.setState({
                interests
            })
        }
        else {
            this.setState({
                [name]: value
            });
        }
        this.checkValidation(name, value);
        console.log("******", this.state);
    }

    updateChooseTypeStateObject(obj) {
        console.log(obj);
        this.setState({ chooseTypeState: obj });
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
        else if (fieldName === "confirmMail") {
            errorMessage = RegisterService.confirmValidation(value, email);
        }

        errors[fieldName] = errorMessage;
        this.setState({
            errors
        });
    }

    createUserClicked() {
        const { name, email, password, type, chooseTypeState, interests, description } = this.state;
        const { CreateBusinessUser, CreateInfluencerUser } = this.props;
        let user = {
            "name": name,
            "email": email,
            "password": password,
            "interests": interests,
            "description": description
        };
        if (type === "Social Influencer") {
            user["Image"] = chooseTypeState.src;
            user["dateOfBirth"] = chooseTypeState.dateOfBirth;
            user["socialNetworks"] = chooseTypeState.socialNetworks;
            user["linksToProfiles"] = chooseTypeState.LinksToProfiles;
            CreateInfluencerUser(user);
        }
        else {
            user["companyLogo"] =chooseTypeState.src;
            user["companyName"] = chooseTypeState.CompanyName;
            user["linkToCompanySite"] = chooseTypeState.LinkToCompanySite;
            CreateBusinessUser(user);
        }
        //if there are no validtion errors
        
    }

    isAllValid() {
        const { isAllValidCustome } = this.props;
        const { errors, email, name, password, confirmPassword, confirmMail } = this.state;
        let isValidInputs = isAllValidCustome ? isAllValidCustome() : true;

        isValidInputs = (StringUtil.isEmptyString(RegisterService.nameValidation(name)))
            && (StringUtil.isEmptyString(RegisterService.emailValidation(email)))
            && (StringUtil.isEmptyString(RegisterService.passwordValidation(password)))
            && (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmPassword, password)))
            && (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmMail, email))); //init, check all fields

        return isValidInputs;
    }

    // isPasswordSet(password){
    //     return StringUtil.isEmptyString(password);
    // }

    render() {
        const { children } = this.props;
        const { name, email, confirmMail, password, confirmPassword, type,
            dateOfBirth, socialNetworks, logo, description, imgUrl, errors } = this.state;
        return (
            <div className="Container">
                <span> Name </span>
                <input type="text" name="name" value={name} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["name"] && errors["name"]}</span>

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


                <span> I'm a: </span>
                <select name="type" onChange={this.handleInputChange}>
                    <option value="Social Influencer" >Social Influencer</option>
                    <option value="Business Owner" >Business Owner</option>
                </select>

                <Interests handleInputChange={this.handleInputChange} />

                {type === "Social Influencer" ? <InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} />
                    : <BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} />}

                <span>Description:</span>
                <input type="text" name="description" onChange={this.handleInputChange} />

                <input type="button" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.createUserClicked} value="Sign up!" />
            </div>
        );
    }
}

export default Register;