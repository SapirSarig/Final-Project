import React, { Component } from 'react';
import Register from "../../common/register/Register";
import { Route, Redirect } from 'react-router';
import UserService from "../../services/apis/UserService";

export default class EditProfile extends Component {
    userService;
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            editOk: false,
            user: {}
        }
        this.userService = new UserService();
        this.UpdateInfluencerUser = this.UpdateInfluencerUser.bind(this);
        this.UpdateBusinessUser = this.UpdateBusinessUser.bind(this);
    }
    componentDidMount() {
        const { location } = this.props;
        if (location && location.state && location.state.userInfo) {
            const { userInfo } = location.state;
            this.setState({ userInfo });
        }
    }

    UpdateInfluencerUser(userToUpdate) {
        this.userService.UpdateInfluencerUser(userToUpdate).then(req => {
            //console.log(req);
            if (req) {
                if(req.Message){
                    alert(req.Message);
                }
                else{
                    this.setState({
                        editOk: true,
                        user: req
                    });
                }
               
            }
            else {
                alert("Server Error");
            }
        });
    }

    UpdateBusinessUser(userToUpdate) {
        this.userService.UpdateBusinessUser(userToUpdate).then(req => {
            //console.log(req);
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {
                    this.setState({
                        editOk: true,
                        user: req
                    });
                }

            }
            else {
                alert("Server Error");
            }
        });
    }
    render() {
        const { userInfo, editOk, user } = this.state;
        return (
            <div>
                {editOk ?
                    (userInfo.Type === "Social Influencer") ?
                        <Redirect to={{
                            pathname: '/influencerHomePage',
                            state: { user }
                        }} /> :
                        <Redirect to={{
                            pathname: '/businessHomePage',
                            state: { user }
                        }} />
                    : <Register signUp={false} user={userInfo} {...this.props} UpdateInfluencerUser={this.UpdateInfluencerUser} UpdateBusinessUser={this.UpdateBusinessUser} />}
            </div>
        );
    }
}