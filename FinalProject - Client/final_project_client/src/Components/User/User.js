import React, { Component } from 'react';
import UserService from './UserService.js';

class User extends Component {
    constructor(props){
        super(props)
        this.userService = new UserService();
        this.userService.getUser();

        
    }

    render() {
      return (
        <div>
            hello
        </div>
      );
    }
  }
  
  export default User;