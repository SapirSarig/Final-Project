import React, { Component } from 'react';
import UserService from '../../services/apis/UserService';

export default class AllNegotiations extends Component {
    userService;
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.state ={
            chats:[]
        }
    }

    componentDidMount(){
        this.userService.getAllUserChats(this.props.location.state.user.Id).then(req => {
            if (req) {
                if (req.message) {
                    alert(req.message);
                }
                else {
                    this.setState({ chats: req })
                }
            }
            else {
                alert("Server error!");
            }
        })
    }

    render() {
        const {chats} = this.state;
        return (
            <div>
                {chats && chats.map(chat =>
                    (<div> chat </div>))}
            </div>
        )
    }
}