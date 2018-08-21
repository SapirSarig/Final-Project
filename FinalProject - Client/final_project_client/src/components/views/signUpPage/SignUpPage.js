import React, { Component } from 'react';
import SignUp from '../../signUp/SignUp';

class SignUpPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SignUp {...this.props}/>
            </div>
        );
    }
}

export default SignUpPage;