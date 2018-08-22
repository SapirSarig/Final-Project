import React, { Component } from 'react';
import Register from '../../common/register/Register';
import UserService from '../../services/apis/UserService';


const initialState = {};

class SignUp extends Component {
    userService;

    constructor(props) {
        super(props);

        this.state = initialState;
        this.CreateInfluencerUser = this.CreateInfluencerUser.bind(this);
        this.CreateBusinessUser = this.CreateBusinessUser.bind(this);
        this.userService = new UserService();
    }

    CreateInfluencerUser(registerObj) {
        const userInfo = Object.assign({}, registerObj, this.state);
        console.log('#########', userInfo);

        this.userService.createInfluencerUser(userInfo).then(req => {
            console.log(req);
            //this.clearForm();
            //this.props.history.push("/login")
        });
    }

    CreateBusinessUser(registerObj) {
        const userInfo = Object.assign({}, registerObj, this.state);
        console.log('#########', userInfo);

        this.userService.createBusinessUser(userInfo).then(req => {
            console.log(req);
            //this.clearForm();
            //this.props.history.push("/login")
        });
    }


    render() {
        return (
            <div>
                <Register {...this.props} CreateInfluencerUser={this.CreateInfluencerUser} CreateBusinessUser = {this.CreateBusinessUser}/>
            </div>
        );
    }
}

export default SignUp;