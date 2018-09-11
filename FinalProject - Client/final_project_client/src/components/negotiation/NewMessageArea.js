
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Negotiation.css';

class NewMessageArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        const { negotiationId, userId } = this.props;
        this.props.addNewMessageToList(this.state.message);
        this.setState({ message: '' });
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    render() {
        return (
            <div className="newMessageArea" onSubmit={this.handleSubmit}>
                <div className="newMessageLabel">
                    Write message:
                </div>
                <div>
                    <textarea className="messageTextArea" value={this.state.message} onChange={this.handleChange} />
                </div>
                <button className="sendBtn" onClick={this.handleSubmit} disabled={this.state.message.length === 0}> Send </button>
            </div>
        );
    }
}

export default NewMessageArea;