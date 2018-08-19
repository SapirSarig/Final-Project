import React, { Component } from 'react';
import BusinessSignUp from '../../businessSignUp/BusinessSignUp';

class BusinessSignUpPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <BusinessSignUp {...this.props}/>
            </div>
        );
    }
}

export default BusinessSignUpPage;