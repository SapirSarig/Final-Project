import React, { Component } from 'react';
import './Register.css';
import RegisterService from '../../services/register/RegisterService';
import StringUtil from '../../utils/StringUtil';

import InfluencerRegister from './InfluencerRegister';
import BusinessRegister from './BusinessRegister';
import Interests from "./Interests";
import VerifyQuestions from "../../common/verifyQuestions/VerifyQuestions";
import SignUp from '../../components/signUp/SignUp';
import PasswordInput from '../../components/passwordInput/passwordInput';
import LayoutButton from '../layoutButton/layoutButton';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { logout } from '../../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const initialState = {
    user: {},
    chooseTypeState: {},
    errors: {
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ConfirmMail: "",
        Question1: "",
        Question2: ""
    },
    externalLogin: false

};

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createUserClicked = this.createUserClicked.bind(this);
        this.isAllValid = this.isAllValid.bind(this);
        this.updateChooseTypeStateObject = this.updateChooseTypeStateObject.bind(this);
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
        this.isSubmitBtnValid = this.isSubmitBtnValid.bind(this);
        // this.isPasswordSet = this.isPasswordSet.bind(this);
    }

    // componentWillMount(){
    //     const {userInfo} = this.props;
    //     if(userInfo){

    //     }
    // }

    componentDidMount() {
        // } else {
        // const { user } = this.props;
        // this.setState({
        //     user
        // });
        const { location } = this.props;
        if (location && location.state) {
            {
                const { user, externalLogin } = location.state;
                this.setState({
                    user,
                    externalLogin
                });
            }

        }
        else {
            const { user } = this.props;
            if (user) {
                this.setState({
                    user
                });
            }
        }
    }
    // const { location } = this.props;
    // if (location && location.state) {
    //     const { loggedUser, externalLogin, user } = location.state;
    //     if (loggedUser && externalLogin) {
    //         const { email, name } = loggedUser;
    //         user.Email = email;
    //         user.Name = name;
    //         user.ExternalLogin = externalLogin;
    //         user.ConfirmMail = email;
    //     }
    //     this.setState({
    //         user
    //     });

    // } else {
    //     const { user } = this.props;
    //     this.setState({
    //         user
    //     });
    // }



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
                    user.Interests.splice(index, 1);
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
        else if ((fieldName === "Question1") || (fieldName === "Question2")) {
            errorMessage = (StringUtil.isEmptyString(value) || StringUtil.hasNumber(value)) ? "Input not valid" : "";
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
            userToCreate["WebsiteLink"] = chooseTypeState.WebsiteLink;
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
                ((user.Type === "Business Owner" && (chooseTypeState.errors.WebsiteLink) === undefined) ||
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

    isSubmitBtnValid() {
        const { user, chooseTypeState } = this.state;
        if (StringUtil.isEmptyString(user.Name)) {
            return false;
        }
        if (user.Type === "Business Owner") {
            if (StringUtil.isEmptyString(user.CompanyName)) {
                return false;
            }
            if (chooseTypeState && chooseTypeState.errors && chooseTypeState.errors.WebsiteLink !== undefined) {
                return false;
            }
        }
        return true;
        // if(StringUtil.isEmptyString(RegisterService.nameValidation(user.Name)))
        // if(user.Type === "Business Owner"){
        //     if (StringUtil.isEmptyString(RegisterService.nameValidation(user.CompanyName))){
        //         res = false;
        //     }
        // }
        // else{
        //     if (StringUtil.isEmptyString(RegisterService.nameValidation(user.CompanyName)))

    }
    handleSubmitClicked() {
        const { user, chooseTypeState } = this.state;
        const { UpdateInfluencerUser, UpdateBusinessUser } = this.props;
        let userToUpdate = {
            "Name": user.Name,
            "Email": user.Email,
            "Interests": user.Interests,
            "Description": user.Description,
            "Picture": user.Picture,
        };
        if (user.Type === "Social Influencer") {
            userToUpdate["SocialNetworks"] = chooseTypeState.socialNetworks;
            UpdateInfluencerUser(userToUpdate);
        } else {
            userToUpdate["CompanyName"] = chooseTypeState.CompanyName;
            userToUpdate["WebsiteLink"] = chooseTypeState.WebsiteLink;
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
        const { children, signUp, classes } = this.props;
        const { user, errors, externalLogin } = this.state;
        return (
            <div className="registerContainer">
                {user && <React.Fragment>

                    <TextField
                        id="name"
                        label={user.Name ? "" : "Name *"}
                        className={classes.textField}
                        value={user.Name}
                        name="Name"
                        onChange={this.handleInputChange}
                        disabled={externalLogin}
                        margin="normal"
                    />

                    {/* <input type="text" name="name" disabled={externalLogin} value={name} onChange={this.handleInputChange} /> */}
                    <span className="errorInput" > {errors["Name"] && errors["Name"]} </span>

                    {signUp && <TextField
                        id="email"
                        label={user.Email ? "" : "Email *"}
                        className={classes.textField}
                        value={user.Email}
                        name="Email"
                        onChange={this.handleInputChange}
                        disabled={externalLogin}
                        margin="normal"
                    />}
                    {/* < input type="email" name="email" disabled={externalLogin} value={email} onChange={this.handleInputChange} /> */}
                    <span className="errorInput" > {errors["Email"] && errors["Email"]} </span>

                    {signUp && <TextField
                        id="confirmMail"
                        label={user.Email ? "" : "Confirm Email *"}
                        className={classes.textField}
                        value={user.ConfirmMail}
                        name="ConfirmMail"
                        onChange={this.handleInputChange}
                        disabled={externalLogin}
                        margin="normal"
                    />}
                    {/* < input type="email" name="confirmMail" disabled={externalLogin} value={confirmMail} onChange={this.handleInputChange} /> */}
                    <span className="errorInput" > {errors["ConfirmMail"] && errors["ConfirmMail"]} </span>

                    {signUp && <PasswordInput name="Password" style={{ width: '75%' }} placeholder="Min 6 chars, one number and one lower case letter" value={user.Password} onChange={this.handleInputChange} label={"Password *"} />}
                    {/* <span > Password {externalLogin && (<span>for the website </span>)} *</span> */}

                    {/* <input type="password" placeholder="Min 6 chars, at least one number and one lower case English letter" name="password" value={password} onChange={this.handleInputChange} /> */}
                    <span className="errorInput" > {errors["Password"] && errors["Password"]} </span>

                    {signUp && <PasswordInput name="ConfirmPassword" style={{ width: '75%' }} value={user.ConfirmPassword} onChange={this.handleInputChange} label={"Confirm Password *"} />}
                    {/* <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleInputChange} /> */}
                    <span className="errorInput" > {errors["ConfirmPassword"] && errors["ConfirmPassword"]} </span>

                    {signUp && <div className="typeOfUser">
                        <span > I'm a: </span>
                        <select className="chooseType" name="Type" onChange={this.handleInputChange} >
                            <option value="Social Influencer" > Social Influencer </option>
                            <option value="Business Owner" > Business Owner </option>
                        </select>
                    </div>}

                    <Interests handleInputChange={this.handleInputChange} interests={user.Interests} signUp={signUp} />

                    {user && user.Type &&
                        <React.Fragment>
                            {user.Type === "Social Influencer" ? <InfluencerRegister errors={errors} updateChooseTypeStateObject={this.updateChooseTypeStateObject} signUp={signUp} userInfo={user} />
                                : <BusinessRegister updateChooseTypeStateObject={this.updateChooseTypeStateObject} userInfo={user} />}
                        </React.Fragment>}
                    <TextField
                        id="description"
                        label={user.Description ? "" : "Description"}
                        multiline
                        rowsMax="8"
                        name="Description"
                        value={user.Description}
                        onChange={this.handleInputChange}
                        className={classes.textField}
                        margin="normal"
                        style={{ width: '80%' }}
                    />
                    {/* <input type="text" name="description" onChange={this.handleInputChange} /> */}

                    <VerifyQuestions signUp={signUp} handleInputChange={this.handleInputChange} question1={user.Question1} question2={user.Question2} errors={errors} />


                    {signUp && <div className={`${this.isAllValid() ? "signUpBtnWrapper" : "disableElement signUpBtnWrapper"}`}>
                        <LayoutButton text="Sign Up!" onClick={this.createUserClicked} />
                    </div>}

                    {!signUp && <div className={`${this.isSubmitBtnValid() ? "signUpBtnWrapper" : "disableElement signUpBtnWrapper"}`}>
                        <LayoutButton text="Submit!" onClick={this.handleSubmitClicked} />
                    </div>}
                </React.Fragment>}

                {/* <input type="button" className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.createUserClicked} value="Sign up!" /> */}
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(Register);

const mapStateToProps = (state) => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logout }, dispatch);
};

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Register));