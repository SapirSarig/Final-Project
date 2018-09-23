
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homePages.css';
import { Route, Redirect } from 'react-router';
import LocalStorageUtil from '../../utils/LocalStorageUtil';
import SessionStorageUtil from '../../utils/SessionStorageUtil';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EditProfileClicked: false,
            LogoutClicked: false
        }
        this.EditProfileClicked = this.EditProfileClicked.bind(this);
        this.LogoutClicked = this.LogoutClicked.bind(this);
    }

    EditProfileClicked() {
        this.setState({ EditProfileClicked: true });
    }

    LogoutClicked() {
        this.setState({ LogoutClicked: true }, () => {
            LocalStorageUtil.RemoveLoggedUser();
            SessionStorageUtil.RemoveLoggedUser();
        });

    }

    render() {
        const { user } = this.props;
        // const userInfo =
        //     {
        //         Name: "rinat",
        //         Email: "rinat@gmail.com",
        //         ConfirmEmail: "rinat@gmail.com",
        //         Picture: "string",
        //         Description: "pop",
        //         Type: "Social Influencer",
        //         CompanyName: "cola",
        //         LinkToCompanySite: "www.walla.com",
        //         SocialNetworks: [
        //             {
        //                 Value: "Facebook",
        //                 LinkToProfile: "www.Facebook.com"
        //             }
        //         ],
        //         Interests: [
        //             {
        //                 value: "Sport"
        //             },
        //             {
        //                 value: "Music"
        //             }
        //         ]

        //     };
        const { EditProfileClicked, LogoutClicked } = this.state;
        return (
            <div className="HomeHeader">
                {LogoutClicked ?
                    <Redirect to={{
                        pathname: '/',
                    }} /> :
                    !EditProfileClicked ?
                        <div>
                            <button onClick={this.LogoutClicked}>Logout </button>

                            <img src={user.Picture} className="logo" />
                            <div className="helloAndLink">
                                Hello {user.Name} !
                        </div>
                            <button onClick={this.EditProfileClicked}> Edit Profile </button>
                        </div>
                        : <Redirect to={{
                            pathname: '/editProfile',
                            state: { user }
                        }} />
                }


            </div>
        );
    }
}

export default HomeHeader;