import React, { Component } from 'react';
import Register from '../../common/register/Register';
import UserService from '../../services/apis/UserService';
import { Route, Redirect } from 'react-router';
import LocalStorageUtil from '../../utils/LocalStorageUtil';
import SessionStorageUtil from '../../utils/SessionStorageUtil';


class SignUp extends Component {
    userService;

    constructor(props) {
        super(props);

        this.CreateInfluencerUser = this.CreateInfluencerUser.bind(this);
        this.CreateBusinessUser = this.CreateBusinessUser.bind(this);
        this.userService = new UserService();

        this.state = {
            user: {
                Name: "",
                Email: "",
                Password: "",
                ConfirmPassword: "",
                ConfirmMail: "",
                Type: "Social Influencer",
                ChooseTypeState: {},
                Interests: [],
                SocialNetworks: [],
                Description: "",
                IsAllValid: false,
                ExternalLogin: false,
                Question1: "",
                Question2: "",
            },
            signUpOk: false
        }
    }

    CreateInfluencerUser(user) {
        //const userInfo = Object.assign({}, registerObj, this.state);
        //console.log('#########', userInfo);
        this.setState({ user });
        this.userService.createInfluencerUser(user).then(req => {
            //console.log(req);
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                } else {
                    this.setState({
                        signUpOk: true,
                        user: req
                    }, () => {
                        LocalStorageUtil.RemoveLoggedUser();
                        SessionStorageUtil.RemoveLoggedUser();
                        SessionStorageUtil.SaveLoggedUser(req);
                    });
                }
            }
            else {
                alert("Server Error!");
            }
        });
    }

    CreateBusinessUser(user) {
        //const userInfo = Object.assign({}, registerObj, this.state);
        //console.log('#########', userInfo);
        this.setState({ user });
        this.userService.createBusinessUser(user).then(req => {
            //console.log(req);
            if (req) {
                this.setState({
                    signUpOk: true,
                    user: req
                }, () => {
                    LocalStorageUtil.RemoveLoggedUser();
                    SessionStorageUtil.RemoveLoggedUser();
                    SessionStorageUtil.SaveLoggedUser(req);
                });
            }
            else {
                alert("User already exists!");
            }

            //this.clearForm();
            //this.props.history.push("/login")
        });
    }

    render() {
        const { signUpOk, user } = this.state;
        return (
            <div>
                {signUpOk ?
                    (user.Type === "Social Influencer") ?
                        <Redirect to={{
                            pathname: '/influencerHomePage',
                            state: { user }
                        }} /> :
                        <Redirect to={{
                            pathname: '/businessHomePage',
                            state: { user }
                        }} />
                    : <Register signUp={true} {...this.props} CreateInfluencerUser={this.CreateInfluencerUser} CreateBusinessUser={this.CreateBusinessUser} user={user} />}
            </div>
        );
    }
}

export default SignUp;