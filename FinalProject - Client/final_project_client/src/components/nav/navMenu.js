import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeNav, logout, setUser } from "../../actions";
import { bindActionCreators } from 'redux';
import './navMenu.css';
import NavMenuLink from './navMenuLink';
import SessionStorageUtil from "../../utils/SessionStorageUtil";
import LocalStorageUtil from '../../utils/LocalStorageUtil';

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };

        this.isUserHasPic = this.isUserHasPic.bind(this);
        this.renderProfilePic = this.renderProfilePic.bind(this);
    }

    componentDidMount() {
        let user = LocalStorageUtil.GetLoggedUser() || SessionStorageUtil.GetLoggedUser();
        this.setState({ user });
    }

    isUserHasPic(user) {
        return (user && user.Picture && user.Picture !== "string" && user.Picture !== "no pic")
    }

    renderProfilePic() {
        const { user } = this.state;

        return (
            <div className="userPicInMenu">
                {this.isUserHasPic(user) ?
                    <img src={user.Picture} className="userPicMenu" />
                    :
                    <svg width="32" height="32" viewBox="0 0 32 32" className="userProfileIconInMenu">
                        <path d="M14 0c7.734 0 14 6.266 14 14 0 7.688-6.234 14-14 14-7.75 0-14-6.297-14-14 0-7.734 6.266-14 14-14zM23.672 21.109c1.453-2 2.328-4.453 2.328-7.109 0-6.609-5.391-12-12-12s-12 5.391-12 12c0 2.656 0.875 5.109 2.328 7.109 0.562-2.797 1.922-5.109 4.781-5.109 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c2.859 0 4.219 2.312 4.781 5.109zM20 11c0-3.313-2.688-6-6-6s-6 2.688-6 6 2.688 6 6 6 6-2.688 6-6z">
                        </path>
                    </svg>
                }
            </div>
        );
    };

    render() {
        const { user } = this.state;
        const isUserSet = user ? !!Object.keys(user).length : false;
        const logoutHandler = () => {
            logout();
            setUser();
            closeNav();
        };

        return (
            <nav className="navMenu">
                {
                    user && user.Type === "Business Owner" ?
                        (
                            <div className="typeMenu">
                                <div>{user.Name}</div>
                                {this.renderProfilePic()}
                                <NavMenuLink title="Home Page" to={{ pathname: "/businessHomePage", state: { user } }} />
                                <NavMenuLink title="Profile" to={{ pathname: "/profile", state: { user } }} />
                            </div>
                        ) :
                        (
                            <div className="typeMenu">
                                <div>{user.Name}</div>
                                {this.renderProfilePic()}
                                <NavMenuLink title="Home Page" to={{ pathname: "/influencerHomePage", state: { user } }} />
                                <NavMenuLink title="Profile" to={{ pathname: "/profile", state: { user } }} />
                            </div>
                        )

                }
                {/* <NavMenuLink title="My Profile" to={{pathname: {(user.Type === "Business Owner") ? "/businessHomePage" : "/influencerHomePage", state: { user } } /> */}
                {/* <NavMenuLink title="Log out" to={"/"} logout="true"/>  */}
                {isUserSet && (
                    <NavMenuLink title="Log out" onClick={() => logoutHandler()} to={`/`} logout="true" />
                )}
            </nav>
        );
    }
};

// export default connect()(NavMenu);

const mapStateToProps = (state) => {
    return {
        user: state.userState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ closeNav, logout, setUser }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu);