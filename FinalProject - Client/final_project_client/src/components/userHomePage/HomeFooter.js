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
                <Link
                    className="allInfluencers styleLink"
                    to={{ pathname: "/allInfluencers", state: {} }}
                >
                    All Influencers
                </Link>
                <Link
                    className="chats styleLink"
                    to={{
                        pathname: "/allNegotiations", state: {
                            user
                        }
                    }}
                >
                    All Chats
                </Link>
            </div>
        )
    }
}