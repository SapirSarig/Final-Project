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
    isAllValid: false,
    externalLogin: false,
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
            const { loggedUser, externalLogin } = location.state;
            if (loggedUser && externalLogin) {
                const { email, name } = loggedUser;
                this.setState({ email, name, externalLogin, confirmMail: email });
            }
        } 
        }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { interests } = this.state;

        if (name === "Interests") {
            let obj={"value":value};
            value && interests.push(obj);

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
            "description": description,
            "type": type,
            "Picture": chooseTypeState.src,
            "Reviews" :[]
        };
        if (type === "Social Influencer") {
            user["dateOfBirth"] = chooseTypeState.dateOfBirth;
            user["socialNetworks"] = chooseTypeState.socialNetworks;
            user["Offers"] = [];
            CreateInfluencerUser(user);
        }
        else {
            user["companyName"] = chooseTypeState.CompanyName;
            user["WebsiteLink"] = chooseTypeState.LinkToCompanySite;
            user["Auctions"] = [];
            CreateBusinessUser(user);
        }
        //if there are no validtion errors

    }

    isAllValid() {
        const { isAllValidCustome } = this.props;
        const { errors, email, name, password, confirmPassword, confirmMail,chooseTypeState, type } = this.state;
        let isValidInputs = isAllValidCustome ? isAllValidCustome() : true;

        isValidInputs = 
            (chooseTypeState && chooseTypeState.errors &&
            ((type === "Business Owner" && typeof(chooseTypeState.errors.linkToCompanySite) === "undefined")
            || ((type === "Social Influencer") && (typeof(chooseTypeState.errors.dateOfBirth) === "undefined") && (typeof(chooseTypeState.dateOfBirth) !== "undefined"))
            && (StringUtil.isEmptyString(RegisterService.nameValidation(name)))
            && (StringUtil.isEmptyString(RegisterService.emailValidation(email)))
            && (StringUtil.isEmptyString(RegisterService.passwordValidation(password)))
            && (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmPassword, password)))
            && (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmMail, email))))); //init, check all fields

        return isValidInputs;
    }

    // isPasswordSet(password){
    //     return StringUtil.isEmptyString(password);
    // }

    render() {
        const { children } = this.props;
        const { name, email, confirmMail, password, confirmPassword, type,
            dateOfBirth, socialNetworks, logo, description, imgUrl, errors, externalLogin, isAllValid } = this.state;
        return (
            <div className="Container">
                <span> Name * </span>
                <input type="text" name="name" disabled={externalLogin} value={name} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["name"] && errors["name"]}</span>

                <span> Email * </span>
                <input type="email" name="email" disabled={externalLogin} value={email} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["email"] && errors["email"]}</span>

                <span> Confirm Email *</span>
                <input type="email" name="confirmMail" disabled={externalLogin} value={confirmMail} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["confirmMail"] && errors["confirmMail"]}</span>

                <span> Password {externalLogin && (<span>for the website</span>)} *</span>
                <input type="password"  placeholder="Min 6 chars, at least one number and one lower case English letter" name="password" value={password} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["password"] && errors["password"]}</span>

                <span> Confirm Password * </span>
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