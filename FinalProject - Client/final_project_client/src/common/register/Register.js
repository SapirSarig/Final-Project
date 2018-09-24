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
    user: {},
    chooseTypeState:{},
    errors: {
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ConfirmMail: ""
    },

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
        const { location } = this.props;
        if (location && location.state) {
            const { loggedUser, externalLogin, user } = location.state;
            if (loggedUser && externalLogin) {
                const { email, name } = loggedUser;
                user.Email = email;
                user.Name = name;
                user.ExternalLogin = externalLogin;
                user.ConfirmMail = email;
            }
            this.setState({
                user
            });

        } else {
            const { user } = this.props;
            this.setState({
                user
            });
        }
    }


    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { user } = this.state;

        if (name === "Interests") {
            let obj = {
                "Value": value
            };
            if (target.type === "checkbox") {
                if (target.checked) {

                    value && user.Interests.push(obj);
                    this.setState({
                        user
                    });
                }
                else {
                    const index = user.Interests.findIndex((interest) => interest.Value === value);
                    user.Interests.splice(index, index + 1);
                    this.setState({
                        user
                    });
                }
            }
            else {
                value && user.Interests.push(obj);
                this.setState({
                    user
                });
               
            }
        }
        else {
            user[name] = value;
            this.setState({
                user
            });
            this.checkValidation(name, value);
        }
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
        const { user, chooseTypeState } = this.state;
        const {
            CreateBusinessUser,
            CreateInfluencerUser
        } = this.props;
        let userToCreate = {
            "Name": user.Name,
            "Email": user.Email,
            "Password": user.Password,
            "Interests": user.Interests,
            "Description": user.Description,
            "Type": user.Type,
            "Picture": chooseTypeState.src,
            "Reviews": [],
            "Chats": [],
            "Question1": user.Question1,
            "Question2": user.Question2
        };
        if (user.Type === "Social Influencer") {
            userToCreate["DateOfBirth"] = chooseTypeState.DateOfBirth;
            userToCreate["SocialNetworks"] = chooseTypeState.socialNetworks;
            userToCreate["Offers"] = [];
            CreateInfluencerUser(userToCreate);
        } else {
            userToCreate["CompanyName"] = chooseTypeState.CompanyName;
            userToCreate["WebsiteLink"] = chooseTypeState.LinkToCompanySite;
            userToCreate["auctions"] = [];
            CreateBusinessUser(userToCreate);
        }
        //if there are no validtion errors

    }

    isAllValid() {
        const {
            isAllValidCustome
        } = this.props;
        const { errors, user, chooseTypeState } = this.state;
        let isValidInputs = isAllValidCustome ? isAllValidCustome() : true;

        isValidInputs =
            (chooseTypeState && chooseTypeState.errors &&
                ((user.Type === "Business Owner" && (chooseTypeState.errors.LinkToCompanySite) === "") ||
                    ((user.Type === "Social Influencer") && (chooseTypeState.errors.DateOfBirth === undefined) && (chooseTypeState.DateOfBirth !== undefined)) &&
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
        const { user } = this.state;
        const { UpdateInfluencerUser, UpdateBusinessUser } = this.props;
        let userToUpdate = {
            "Name": "Sapir",
            "Email": user.Email,
            "Interests": user.Interests,
            "Description": user.Description,
            "Picture": user.Picture,
        };
        if (user.Type === "Social Influencer") {
            userToUpdate["SocialNetworks"] = user.SocialNetworks;
            UpdateInfluencerUser(userToUpdate);
        } else {
            userToUpdate["CompanyName"] = user.CompanyName;
            userToUpdate["WebsiteLink"] = user.WebsiteLink;
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
        const { user, errors } = this.state;
        return (
            <div className="Container">
                <span > Name * </span>
                <input type="text" name="Name" disabled={user.ExternalLogin} value={user.Name} onChange={this.handleInputChange} />
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

                <Interests handleInputChange={this.handleInputChange} interests={user.Interests} signUp={signUp} />

                {/* {(Object.getOwnPropertyNames(userInfo).length > 0) ?
                    (userInfo.Type === "Social Influencer" ?
                        <InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} signUp={signUp} userInfo={userInfo} />
                        : <BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} userInfo={userInfo} />) */}

                {user.Type === "Social Influencer" ? <InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} signUp={signUp} userInfo={user} />
                    : <BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} userInfo={user} />}

                <span> Description: </span>
                <input type="text" name="Description" value={user.Description} onChange={this.handleInputChange} />

                <VerifyQuestions signUp={signUp} handleInputChange={this.handleInputChange} question1={user.Question1} question2={user.Question2} />

                {signUp && <input type="button" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.createUserClicked} value="Sign up!" />}
                {!signUp && <input type="button" value="Submit" onClick={this.handleSubmitClicked} />}

            </div>
        );
    }
}

export default Register;