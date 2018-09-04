
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homePages.css';

class HomeHeader extends Component {

    render() {
        const { name,picture } = this.props;
        return (
            <div className="HomeHeader">
            <img src={picture} className="logo" />
                <div className="helloAndLink">
                    Hello
                    <Link className="HomePage" to="/">
                        {name}
                    </Link>
                </div>
            <button> Edit Profile </button>    


            </div>
        );
    }
}

export default HomeHeader;