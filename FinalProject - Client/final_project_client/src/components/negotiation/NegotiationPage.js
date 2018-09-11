
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NegotiationService from '../../services/apis/NegotiationService';
import History from './History';
import NewMessageArea from './NewMessageArea';
import './Negotiation.css';

class NegotiationPage extends Component {
    NegotiationService;

    constructor(props) {
        super(props);
        this.NegotiationService = new NegotiationService();
        this.addNewMessageToList = this.addNewMessageToList.bind(this);

        this.state = {
            messages:[]
        }
    }

    addNewMessageToList(message) {
        const newList = this.state.messages;
        const from = "Any user";
        const dateAndTime = new Date().toLocaleString();
        const messageToAdd = {
            from, dateAndTime , message
        }
        newList.push(messageToAdd);
        this.setState({ messages: newList });
    }

    render() {
        const {messages} = this.state;
        return (
            <div>
                <NewMessageArea addNewMessageToList = {this.addNewMessageToList}/>
                <br/>
                <History messages={messages} />
            </div>
        );
    }
}

export default NegotiationPage;