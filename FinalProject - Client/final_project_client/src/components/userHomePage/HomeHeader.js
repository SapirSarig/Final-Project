
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homePages.css';

class HomeHeader extends Component {

    render() {
        const { name } = this.props;
        return (
            <div className="HomeHeader">
                <div className="UserImg">
                    <img className="userPicture" src={require('../../images/userPic.jpg')} alt="user picture" />
                </div>
                <div className="helloAndLink">
                    Hello
                    <Link className="HomePage" to="/">
                        {name}
                    </Link>
                </div>
            </div>
        );
    }
}

export default HomeHeader;