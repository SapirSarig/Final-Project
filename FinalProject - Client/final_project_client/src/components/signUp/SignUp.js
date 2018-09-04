import React, { Component } from 'react';
import Register from '../../common/register/Register';
import UserService from '../../services/apis/UserService';
import { Route, Redirect } from 'react-router';

const initialState = {
    signUpOk: false,
    userInfo: {}
};

class SignUp extends Component {
    userService;

    constructor(props) {
        super(props);

        this.state = initialState;
        this.CreateInfluencerUser = this.CreateInfluencerUser.bind(this);
        this.CreateBusinessUser = this.CreateBusinessUser.bind(this);
        this.userService = new UserService();
    }

    CreateInfluencerUser(userInfo) {
        //const userInfo = Object.assign({}, registerObj, this.state);
        //console.log('#########', userInfo);
        this.setState({ userInfo });
        this.userService.createInfluencerUser(userInfo).then(req => {
            //console.log(req);
            if (req) {
                this.setState({ signUpOk: true });
            }
            else {
                alert("User already exists!");
            }
        });
    }

    CreateBusinessUser(userInfo) {
        //const userInfo = Object.assign({}, registerObj, this.state);
        //console.log('#########', userInfo);
        this.setState({ userInfo });
        this.userService.createBusinessUser(userInfo).then(req => {
            //console.log(req);
            if (req) {
                this.setState({ signUpOk: true });

            }
            else {
                alert("User already exists!");
            }

            //this.clearForm();
            //this.props.history.push("/login")
        });
    }

    render() {
        const { signUpOk, userInfo } = this.state;
        return (
            <div>
                {signUpOk ?
                    (userInfo.type === "Social Influencer") ?
                        <Redirect to={{
                            pathname: '/InfluencerHomePage',
                            props: { userInfo }
                        }} /> :
                        <Redirect to={{
                            pathname: '/businessHomePage',
                            props: { userInfo }
                        }} />
                    : <Register {...this.props} CreateInfluencerUser={this.CreateInfluencerUser} CreateBusinessUser={this.CreateBusinessUser} />}
            </div>
        );
    }
}

export default SignUp;