import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { user } = this.props;
        return (
            <div className="HomeHeader">
                {user.Type==="Business Owner"?<Link
                    className="allInfluencers styleLink"
                    to={{ pathname: "/allInfluencers", state: {} }}
                >
                    All Influencers
                </Link>:
                <Link
                className="allUsers styleLink"
                to={{ pathname: "/allUsers", state: {} }}
            >
                All Users
            </Link>
            }
            </div>
        )
    }
}