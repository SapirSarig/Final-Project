import React, { Component } from 'react';

class StarProfile extends Component {
    state = {}
    render() {
        const {dateOfBirth, socialNetworks} = this.props;
        //const {socialNetworks, dateOfBirth} = this.props;
        return (
            <div className="Container">

                <span> Social Networks </span>
                <span> {socialNetworks} </span>

                <span> Date Of Birth </span>
                <span> {dateOfBirth} </span>

            </div>
        );
    }
}

export default StarProfile;