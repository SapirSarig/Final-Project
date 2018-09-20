
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homePages.css';
import { Route, Redirect } from 'react-router';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EditProfileClicked: false
        }
        this.EditProfileClicked = this.EditProfileClicked.bind(this);
    }

    EditProfileClicked() {
        this.setState({ EditProfileClicked: true });
    }
    render() {
         const { userInfo } = this.props;
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
        const { EditProfileClicked } = this.state;
        return (
            <div className="HomeHeader">
                {!EditProfileClicked ?
                    <div>
                        <img src={userInfo.Picture} className="logo" />
                        <div className="helloAndLink">
                            Hello {userInfo.Name} !
                        </div>
                        <button onClick={this.EditProfileClicked}> Edit Profile </button>
                    </div>
                    : <Redirect to={{
                        pathname: '/editProfile',
                        state: { userInfo }
                    }} />
                }


            </div>
        );
    }
}

export default HomeHeader;