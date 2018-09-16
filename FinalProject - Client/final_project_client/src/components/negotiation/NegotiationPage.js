
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NegotiationService from '../../services/apis/NegotiationService';
import History from './History';
import NewMessageArea from './NewMessageArea';
import './Negotiation.css';
import Status from './Status';

class NegotiationPage extends Component {
    NegotiationService;

    constructor(props) {
        super(props);
        this.NegotiationService = new NegotiationService();
        this.addNewMessageToList = this.addNewMessageToList.bind(this);
        this.getNegotiationContent = this.getNegotiationContent.bind(this);
        this.state = {
            messages: []
        }
    }
    componentDidMount() {
        this.getNegotiationContent();
        setInterval(this.getNegotiationContent, 10000);
    }

    getNegotiationContent() {
        //const { chatId } = this.props;
        const chatId = 1;
        this.NegotiationService.getMessagesByOfferId(chatId).then(messages => {
            this.setState({ messages });
        })
    }

    addNewMessageToList(Text) {
        const newList = this.state.messages;
        //const From = this.props.user.Name;
        const From = "golan"
        const TimeSent = null;
        const messageToAdd = {
            From,
            TimeSent,
            Text,
            ChatId: 1
        }

        this.NegotiationService.addMessage(messageToAdd);
    }

    render() {
        const { messages } = this.state;
        return (
            <div>
                <Status />
                <NewMessageArea addNewMessageToList={this.addNewMessageToList} />
                <br />
                <History messages={messages} />
            </div>
        );
    }
}

export default NegotiationPage;