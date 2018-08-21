import React, { Component } from 'react';
import Register from '../../common/register/Register';
import UserService from '../../services/apis/UserService';


const initialState = {};

class SignUp extends Component {
    userService;

    constructor(props) {
        super(props);

        this.state = initialState;
        this.onCreateUser = this.onCreateUser.bind(this);
        this.userService = new UserService();
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

    render() {
        return (
            <div>
                <Register {...this.props} onCreateUser={this.onCreateUser}/>
            </div>
        );
    }
}

export default SignUp;