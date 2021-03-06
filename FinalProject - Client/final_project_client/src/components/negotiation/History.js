
import React, { Component } from 'react';
import Message from './Message';
import './Negotiation.css';

class History extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { messages } = this.props;
        return (
            <div>
                <div className="historyTitle">History: </div>
                <br />
                {messages && messages.length>0 && messages.map((message, index) =>
                    <Message key={index} message={message} isReview = {false} />
                )}
            </div>
        );
    }
}

export default History;