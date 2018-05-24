import React, { Component } from 'react';
import Login from '../../../components/login/Login';
  
class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Login/>
            </div>
        
        );
    }
}

export default LoginPage;