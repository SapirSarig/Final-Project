import React, { Component } from 'react';

class StarProfile extends Component {
    state = {}
    render() {
        const { dateOfBirth, socialNetworks } = this.props;
        //const {socialNetworks, dateOfBirth} = this.props;
        return (
            <div className="Container">

                <span> Social Networks </span>
                {socialNetworks && socialNetworks.length > 0 ?
                 <div className="socialNetworks">
                {socialNetworks.map(sn =>
                        (<a href={sn.LinkToProfile}> <img src={""} className="logo" /><br/></a>))}
                </div> : <div>No Social Networks To Show!</div>}
                <span> Date Of Birth </span>
                <span> {dateOfBirth} </span>

            </div>
        );
    }
}

export default StarProfile;