
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Negotiation.css';

class Message extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { message } = this.props;
        return (
            <div className="messageFromHistory">
                <div> From: {message.from}</div>
                <div> At: {message.dateAndTime} </div>
                <div> Message: {message.message} </div>
                <br/>
            </div>
        );
    }
}

export default Message;