
import React, { Component } from 'react';
import './homePages.css';
import './homeHeader.css';
import { Redirect } from 'react-router';
import LayoutButton from '../../common/layoutButton/layoutButton';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EditProfileClicked: false,
        }
        this.EditProfileClicked = this.EditProfileClicked.bind(this);
        this.isUserHasPic = this.isUserHasPic.bind(this);
    }

    EditProfileClicked() {
        this.setState({ EditProfileClicked: true });
    }

    isUserHasPic(user){
        return (user && user.Picture && user.Picture !== "string" && user.Picture !== "no pic")
    }

    render() {
        const { user } = this.props;

        const { EditProfileClicked } = this.state;
        return (
            <div className="HomeHeader">
                {
                    !EditProfileClicked ?
                        <div>
                            <div className="businessProfileImgWrapper">
                                {this.isUserHasPic(user) ?
                                <img src={user.Picture} className="profliePic"/> :
                                <svg width="32" height="32" viewBox="0 0 32 32" className="userProfileIcon">
                                    <path d="M14 0c7.734 0 14 6.266 14 14 0 7.688-6.234 14-14 14-7.75 0-14-6.297-14-14 0-7.734 6.266-14 14-14zM23.672 21.109c1.453-2 2.328-4.453 2.328-7.109 0-6.609-5.391-12-12-12s-12 5.391-12 12c0 2.656 0.875 5.109 2.328 7.109 0.562-2.797 1.922-5.109 4.781-5.109 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c2.859 0 4.219 2.312 4.781 5.109zM20 11c0-3.313-2.688-6-6-6s-6 2.688-6 6 2.688 6 6 6 6-2.688 6-6z">
                                    </path>
                                </svg>
                                }
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