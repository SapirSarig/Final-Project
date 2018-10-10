
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homePages.css';
import './homeHeader.css';
import { Route, Redirect } from 'react-router';
import LocalStorageUtil from '../../utils/LocalStorageUtil';
import SessionStorageUtil from '../../utils/SessionStorageUtil';
import LayoutButton from '../../common/layoutButton/layoutButton';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EditProfileClicked: false,
        }
        this.EditProfileClicked = this.EditProfileClicked.bind(this);
    }

    EditProfileClicked() {
        this.setState({ EditProfileClicked: true });
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
        const { EditProfileClicked } = this.state;
        return (
            <div className="HomeHeader">
                {
                    !EditProfileClicked ?
                        <div>
                           

                            <div className="businessProfileImgWrapper">
                                <img src={user.Picture} className="profliePic"/>
                            </div>
                            <div className="helloAndLink">
                                Hello {user.Name} !
                        </div>
                            <LayoutButton text ="Edit Profile" onClick={this.EditProfileClicked}/>
                            {/* <button onClick={this.EditProfileClicked}> Edit Profile </button> */}
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