import React, { Component } from 'react';
import Register from "../../common/register/Register";
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }
    componentDidMount() {
        const { location } = this.props;
        if (location && location.state && location.state.userInfo) {
            const { userInfo } = location.state;
            this.setState({ userInfo });
        }
    }
    render() {
        const { userInfo } = this.state;
        return (
            <div>
                <Register signUp={false} userInfo={userInfo}/>
            </div>
        );
    }
}