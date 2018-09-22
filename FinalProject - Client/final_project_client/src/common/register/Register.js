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
    user: {
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ConfirmMail: "",
        Type: "Social Influencer",
        ChooseTypeState: {},
        Interests: [],
        Description: "",
        IsAllValid: false,
        ExternalLogin: false,
        Question1: "",
        Question2: "",
    },

    errors: {
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ConfirmMail: ""
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
        let { user } = this.state;
        const {
            location
        } = this.props;
        if (location && location.state) {
            const {
                loggedUser,
                externalLogin,
                userInfo
            } = location.state;
            if (loggedUser && externalLogin) {
                const {
                    email,
                    name
                } = loggedUser;
                user.Email = email;
                user.Name = name;
                user.ExternalLogin = externalLogin;
                user.ConfirmMail = email;
                this.setState({
                    user
                });
            } else if (userInfo) {
                this.setState({
                    userInfo
                });
            }
        }


    }


    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { user } = this.state;
        let { userInfo } = this.state;

        if (name === "Interests") {
            let obj = {
                "Value": value
            };
            if (target.type === "checkbox") {
                if (target.checked) {



                    value && user.Interests.push(obj);

                    if (Object.getOwnPropertyNames(userInfo).length > 0) {
                        value && userInfo.Interests && userInfo.Interests.push(obj);
                        this.setState({
                            userInfo
                        })
                    }
                    this.setState({
                        user
                    })
                }
                else {
                    const index = user.Interests.findIndex((interest) => interest.Value === value);
                    user.Interests.splice(index, index + 1);
                    this.setState({
                        user
                    });
                    if (Object.getOwnPropertyNames(userInfo).length > 0) {
                        const index = userInfo.Interests.findIndex((interest) => interest.Value === value);
                        userInfo.Interests.splice(index, index + 1);
                        this.setState({
                            userInfo
                        })
                    }
                }
            }
            else {
                value && user.Interests.push(obj);

                this.setState({
                    user
                });
                if (Object.getOwnPropertyNames(userInfo).length > 0) {
                    value && userInfo.Interests.push(obj);
                    this.setState({
                        userInfo
                    })
                }
            }
        }
        else {
            user[name] = value;
            this.setState({
                user
            });
            if (Object.getOwnPropertyNames(userInfo).length > 0) {
                userInfo[name] = value;
                this.setState({
                    userInfo
                });
            }

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
            user
        } = this.state;

        let errorMessage;
        if (fieldName === "Name") {
            errorMessage = RegisterService.nameValidation(value);
        } else if (fieldName === "Email") {
            errorMessage = RegisterService.emailValidation(value);
        } else if (fieldName === "Password") {
            errorMessage = RegisterService.passwordValidation(value);
        } else if (fieldName === "ConfirmPassword") {
            errorMessage = RegisterService.confirmValidation(value, user.Password);
        } else if (fieldName === "ConfirmMail") {
            errorMessage = RegisterService.confirmValidation(value, user.Email);
        }

        errors[fieldName] = errorMessage;
        this.setState({
            errors
        });
    }

    createUserClicked() {
        const { user } = this.state;
        const {
            CreateBusinessUser,
            CreateInfluencerUser
        } = this.props;
        let userToCreate = {
            "Name": user.Name,
            "Email": user.Email,
            "Password": user.Passwordpassword,
            "Interests": user.Interests,
            "Description": user.Description,
            "Type": user.Typetype,
            "Picture": user.ChooseTypeState.src,
            "Reviews": [],
            "Chats": [],
            "Question1": user.Question1,
            "Question2": user.Question2
        };
        if (user.Type === "Social Influencer") {
            userToCreate["DateOfBirth"] = user.ChooseTypeState.dateOfBirth;
            userToCreate["SocialNetworks"] = user.ChooseTypeState.socialNetworks;
            userToCreate["Offers"] = [];
            CreateInfluencerUser(userToCreate);
        } else {
            userToCreate["CompanyName"] = user.ChooseTypeState.CompanyName;
            userToCreate["WebsiteLink"] = user.ChooseTypeState.LinkToCompanySite;
            userToCreate["auctions"] = [];
            CreateBusinessUser(userToCreate);
        }
        //if there are no validtion errors

    }

    isAllValid() {
        const {
            isAllValidCustome
        } = this.props;
        const { errors, user } = this.state;
        let isValidInputs = isAllValidCustome ? isAllValidCustome() : true;

        isValidInputs =
            (user.ChooseTypeState && user.ChooseTypeState.errors &&
                ((user.Type === "Business Owner" && typeof (user.ChooseTypeState.errors.LinkToCompanySite) === "undefined") ||
                    ((user.Type === "Social Influencer") && (typeof (user.ChooseTypeState.errors.DateOfBirth) === "undefined") && (typeof (user.ChooseTypeState.DateOfBirth) !== "undefined")) &&
                    (StringUtil.isEmptyString(RegisterService.nameValidation(user.Question1))) &&
                    (StringUtil.isEmptyString(RegisterService.nameValidation(user.Question2))) &&
                    (StringUtil.isEmptyString(RegisterService.nameValidation(user.Name))) &&
                    (StringUtil.isEmptyString(RegisterService.emailValidation(user.Email))) &&
                    (StringUtil.isEmptyString(RegisterService.passwordValidation(user.Password))) &&
                    (StringUtil.isEmptyString(RegisterService.confirmValidation(user.ConfirmPassword, user.Password))) &&
                    (StringUtil.isEmptyString(RegisterService.confirmValidation(user.ConfirmMail, user.Email))))); //init, check all fields

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
        const { children, signUp } = this.props;
        const { userInfo, user, errors } = this.state;
        return (
            <div className="Container">
                <span > Name * </span>
                <input type="text" name="Name" disabled={user.ExternalLogin} value={Object.getOwnPropertyNames(userInfo).length > 0 ? userInfo.Name : user.Name} onChange={this.handleInputChange} />
                <span className="errorInput" > {errors["Name"] && errors["Name"]} </span>

                {signUp && <div className="emailContainer">
                    <span > Email * </span>
                    < input type="email" name="Email" disabled={user.ExternalLogin} value={user.Email} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["Email"] && errors["Email"]} </span>
                </div>}

                {signUp && <div className="confirmEmailContainer">
                    <span > Confirm Email * </span>
                    <input type="email" name="ConfirmMail" disabled={user.ExternalLogin} value={user.ConfirmMail} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["ConfirmMail"] && errors["ConfirmMail"]} </span>
                </div>}

                {signUp && <div className="passwordContainer">
                    <span > Password {user.ExternalLogin && (<span>for the website </span>)} *</span>
                    <input type="password" placeholder="Min 6 chars, at least one number and one lower case English letter" name="Password" value={user.Password} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["Password"] && errors["Password"]} </span>
                </div>}

                {signUp && <div className="confirmPasswordContainer">
                    <span > Confirm Password * </span>
                    <input type="password" name="ConfirmPassword" value={user.ConfirmPassword} onChange={this.handleInputChange} />
                    <span className="errorInput" > {errors["ConfirmPassword"] && errors["ConfirmPassword"]} </span>
                </div>}

                {signUp && <div className="pickerContainer">
                    <span > I 'm a: </span>
                    <select name="Type" onChange={this.handleInputChange} >
                        <option value="Social Influencer" > Social Influencer </option>
                        <option value="Business Owner" > Business Owner </option>
                    </select>
                </div>}

                <Interests handleInputChange={this.handleInputChange} interests={Object.getOwnPropertyNames(userInfo).length > 0 ? userInfo.Interests : undefined} signUp={signUp} />

                {(Object.getOwnPropertyNames(userInfo).length > 0) ?
                    (userInfo.Type === "Social Influencer" ?
                        <InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} signUp={signUp} userInfo={userInfo} />
                        : <BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} userInfo={userInfo} />)

                    : user.Type === "Social Influencer" ? <InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} signUp={signUp} />
                        : <BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} />}

                <span> Description: </span>
                <input type="text" name="Description" value={userInfo ? userInfo.Description : user.Description} onChange={this.handleInputChange} />

                <VerifyQuestions signUp={signUp} handleInputChange={this.handleInputChange} question1={user.Question1} question2={user.Question2} />

                {signUp && <input type="button" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.createUserClicked} value="Sign up!" />}
                {!signUp && <input type="button" value="Submit" onClick={this.handleSubmitClicked} />}

            </div>
        );
    }
}

export default Register;