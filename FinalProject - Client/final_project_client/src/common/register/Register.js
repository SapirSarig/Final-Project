import React, {
    Component
} from 'react';
import './Register.css';
import RegisterService from '../../services/register/RegisterService';
import StringUtil from '../../utils/StringUtil';
import InfluencerRegister from './InfluencerRegister';
import BusinessRegister from './BusinessRegister';
import Interests from "./Interests";
import VerifyQuestions from "../../common/verifyQuestions/VerifyQuestions";
import SignUp from '../../components/signUp/SignUp';

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
    question1: "",
    question2: "",
    errors: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        confirmMail: ""
    },
    userInfo: {}
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createUserClicked = this.createUserClicked.bind(this);
        this.isAllValid = this.isAllValid.bind(this);
        this.updateChooseTypeStateObject = this.updateChooseTypeStateObject.bind(this);
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
        // this.isPasswordSet = this.isPasswordSet.bind(this);
    }

    // componentWillMount(){
    //     const {userInfo} = this.props;
    //     if(userInfo){

    //     }
    // }

    componentDidMount() {
        const {
            location
        } = this.props;
        if (location && location.state) {
            const {
                loggedUser,
                externalLogin
            } = location.state;
            if (loggedUser && externalLogin) {
                const {
                    email,
                    name
                } = loggedUser;
                this.setState({
                    email,
                    name,
                    externalLogin,
                    confirmMail: email
                });
            }
        }
        let { userInfo } = this.props;
        if (userInfo) {
            this.setState({
                userInfo
            });
        }

    }


    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { interests } = this.state;

        if (name === "Interests") {
            let obj = {
                "value": value
            };
            if (target.type === "checkbox") {
                if (target.checked) {

                    value && interests.push(obj);

                    this.setState({
                        interests
                    })
                }
                else {
                    const index = interests.findIndex((interest) => interest.value === value);
                    interests.splice(index, index + 1);
                }
            }
            else {
                value && interests.push(obj);

                this.setState({
                    interests
                });
            }
        }
        else {
            this.setState({
                [name]: value
            });
            this.checkValidation(name, value);
        }

        console.log("******", this.state);
    }


    updateChooseTypeStateObject(obj) {
        console.log(obj);
        this.setState({
            chooseTypeState: obj
        });
    }

    checkValidation(fieldName, value) {
        const {
            errors,
            password,
            email
        } = this.state;

        let errorMessage;
        if (fieldName === "name") {
            errorMessage = RegisterService.nameValidation(value);
        } else if (fieldName === "email") {
            errorMessage = RegisterService.emailValidation(value);
        } else if (fieldName === "password") {
            errorMessage = RegisterService.passwordValidation(value);
        } else if (fieldName === "confirmPassword") {
            errorMessage = RegisterService.confirmValidation(value, password);
        } else if (fieldName === "confirmMail") {
            errorMessage = RegisterService.confirmValidation(value, email);
        }

        errors[fieldName] = errorMessage;
        this.setState({
            errors
        });
    }

    createUserClicked() {
        const {
            name,
            email,
            password,
            type,
            chooseTypeState,
            interests,
            description,
            question1,
            question2
        } = this.state;
        const {
            CreateBusinessUser,
            CreateInfluencerUser
        } = this.props;
        let user = {
            "Name": name,
            "Email": email,
            "Password": password,
            "Interests": interests,
            "Description": description,
            "Type": type,
            "Picture": chooseTypeState.src,
            "Reviews": [],
            "Chats": [],
            "Question1": question1,
            "Question2": question2
        };
        if (type === "Social Influencer") {
            user["DateOfBirth"] = chooseTypeState.dateOfBirth;
            user["SocialNetworks"] = chooseTypeState.socialNetworks;
            user["Offers"] = [];
            CreateInfluencerUser(user);
        } else {
            user["CompanyName"] = chooseTypeState.CompanyName;
            user["WebsiteLink"] = chooseTypeState.LinkToCompanySite;
            user["auctions"] = [];
            CreateBusinessUser(user);
        }
        //if there are no validtion errors

    }

    isAllValid() {
        const {
            isAllValidCustome
        } = this.props;
        const {
            errors,
            email,
            name,
            password,
            confirmPassword,
            confirmMail,
            chooseTypeState,
            type,
            question1,
            question2
        } = this.state;
        let isValidInputs = isAllValidCustome ? isAllValidCustome() : true;

        isValidInputs =
            (chooseTypeState && chooseTypeState.errors &&
                ((type === "Business Owner" && typeof (chooseTypeState.errors.linkToCompanySite) === "undefined") ||
                    ((type === "Social Influencer") && (typeof (chooseTypeState.errors.dateOfBirth) === "undefined") && (typeof (chooseTypeState.dateOfBirth) !== "undefined")) &&
                    (StringUtil.isEmptyString(RegisterService.nameValidation(question1))) &&
                    (StringUtil.isEmptyString(RegisterService.nameValidation(question2))) &&
                    (StringUtil.isEmptyString(RegisterService.nameValidation(name))) &&
                    (StringUtil.isEmptyString(RegisterService.emailValidation(email))) &&
                    (StringUtil.isEmptyString(RegisterService.passwordValidation(password))) &&
                    (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmPassword, password))) &&
                    (StringUtil.isEmptyString(RegisterService.confirmValidation(confirmMail, email))))); //init, check all fields

        return isValidInputs;
    }
    handleSubmitClicked() {
        const { userInfo } = this.props;
        const { UpdateInfluencerUser, UpdateBusinessUser } = this.props;
        let userToUpdate = {
            "Name": "Sapir",
            "Email": userInfo.Email,
            "Interests": userInfo.Interests,
            "Description": userInfo.Description,
            "Picture": userInfo.Picture,
        };
        if (userInfo.Type === "Social Influencer") {
            userToUpdate["SocialNetworks"] = userInfo.SocialNetworks;
            UpdateInfluencerUser(userToUpdate);
        } else {
            userToUpdate["CompanyName"] = userInfo.CompanyName;
            userToUpdate["WebsiteLink"] = userInfo.WebsiteLink;
            UpdateBusinessUser(userToUpdate);
        }
    }
    // isPasswordSet(password){
    //     return StringUtil.isEmptyString(password);
    // }
    // updateUserInfo(userInfo){
    //     this.setState({userInfo})
    // }

    render() {
        const { children, signUp, userInfo } = this.props;
        const {
            name,
            email,
            confirmMail,
            password,
            confirmPassword,
            type,
            dateOfBirth,
            socialNetworks,
            logo,
            description,
            imgUrl,
            errors,
            externalLogin,
            isAllValid,
            question1,
            question2
            } = this.state;
        return (
            <div className="Container">
                <span > Name * </span>
                <input type="text" name="name" disabled={externalLogin} value={userInfo ? userInfo.Name : name} onChange={this.handleInputChange} />
                <span className="errorInput" > {errors["name"] && errors["name"]} </span>

                {signUp && <div className="emailContainer">
                    <span > Email * </span>
                    < input type="email" name="email" disabled={externalLogin} value={email} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["email"] && errors["email"]} </span>
                </div>}

                {signUp && <div className="confirmEmailContainer">
                    <span > Confirm Email * </span>
                    <input type="email" name="confirmMail" disabled={externalLogin} value={confirmMail} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["confirmMail"] && errors["confirmMail"]} </span>
                </div>}

                {signUp && <div className="passwordContainer">
                    <span > Password {externalLogin && (<span>for the website </span>)} *</span>
                    <input type="password" placeholder="Min 6 chars, at least one number and one lower case English letter" name="password" value={password} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["password"] && errors["password"]} </span>
                </div>}

                {signUp && <div className="confirmPasswordContainer">
                    <span > Confirm Password * </span>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["confirmPassword"] && errors["confirmPassword"]} </span>
                </div>}

                {signUp && <div className="pickerContainer">
                    <span > I 'm a: </span>
                    <select name="type" onChange={this.handleInputChange} >
                        <option value="Social Influencer" > Social Influencer </option>
                        <option value="Business Owner" > Business Owner </option>
                    </select>
                </div>}

                <Interests handleInputChange={this.handleInputChange} interests={userInfo ? userInfo.Interests : null} />

                {userInfo ?
                    (userInfo.Type === "Social Influencer" ?
                        < InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} signUp={signUp} userInfo={userInfo} />
                        : < BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} userInfo={userInfo} />)

                    : type === "Social Influencer" ? < InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} signUp={signUp} />
                        : < BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} />}

                <span> Description: </span>
                <input type="text" name="description" value={userInfo ? userInfo.Description : description} onChange={this.handleInputChange} />

                <VerifyQuestions signUp={signUp} handleInputChange={this.handleInputChange} question1={question1} question2={question2} />

                {signUp && <input type="button" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.createUserClicked} value="Sign up!" />}
                {!signUp && <input type="button" value="Submit" onClick={this.handleSubmitClicked} />}

            </div>
        );
    }
}

export default Register;