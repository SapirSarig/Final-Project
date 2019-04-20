
import React, { Component } from 'react';
import NegotiationService from '../../services/apis/NegotiationService';
import History from './History';
import NewMessageArea from './NewMessageArea';
import './Negotiation.css';
import Status from './Status';
import OfferService from '../../services/apis/OfferService';


class NegotiationPage extends Component {
    negotiationService;
    offerService;
    constructor(props) {
        super(props);
        this.negotiationService = new NegotiationService();
        this.offerService = new OfferService();
        this.addNewMessageToList = this.addNewMessageToList.bind(this);
        this.getNegotiationContent = this.getNegotiationContent.bind(this);
        this.state = {
            messages: [],
            chat:{}
        }
    }
    componentDidMount() {
        const {OfferId} = this.props;
        if (OfferId !== "") {
            this.negotiationService.getChatByOfferId(OfferId).then(req => {
                if (req) {
                    if (req.Message) {
                        alert(req.Message);
                    }
                    else {
                        this.setState({
                            chat: req
                        });
                    }
                }
            });
        }
        this.getNegotiationContent(); 
        setInterval(this.getNegotiationContent, 10000);

    }

    getNegotiationContent() {
        const {OfferId} = this.props;
        this.negotiationService.getMessagesByOfferId(OfferId).then(messages => {
            this.setState({ messages });
        })
    }

    addNewMessageToList(Text) {
        const {chat} = this.state;
        const From = this.props.user.Name;
        const TimeSent = null;
        const messageToAdd = {
            From,
            TimeSent,
            Text,
            ChatId: chat.Id
        }

        this.negotiationService.addMessage(messageToAdd);
    }

    render() {
        const { messages } = this.state;
        const {offerAccepted} = this.props;

        return (
            <div>
                <div className ="negoTitle">Negotiation</div>
                {!offerAccepted && <Status offerId={this.props.OfferId}/>}
                <NewMessageArea addNewMessageToList={this.addNewMessageToList} />
                <br />
                <History messages={messages} />
            </div>
        );
    }
}

export default NegotiationPage;