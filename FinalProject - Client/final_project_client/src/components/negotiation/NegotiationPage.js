
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            // this.offerService.getOfferById(OfferId).then(req => {
            //     //console.log(req);
            //     if (req) {
            //         if (req.Message) {
            //             alert(req.Message);
            //         }
            //         else {
            //             this.setState({
            //                 openNegotiation: req.IsOpenNegotiation
            //             });
            //         }
            //     }
            // });
            this.negotiationService.getChatByOfferId(OfferId).then(req => {
                //console.log(req);
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

        //this.setState({chat});
        this.getNegotiationContent(); // ????
        setInterval(this.getNegotiationContent, 10000);
        // this.offerService.updateIsOpenNegotiations(OfferId).then(req => {
        //     //console.log(req);
        //     if (req) {
        //         if (req.Message) {
        //             alert(req.Message);
        //         }
        //     }
        // });
    }

    getNegotiationContent() {
        //const { chatId } = this.props;
        const {OfferId} = this.props;
        this.negotiationService.getMessagesByOfferId(OfferId).then(messages => {
            this.setState({ messages });
        })
    }

    addNewMessageToList(Text) {
        const {chat} = this.state;
        const newList = this.state.messages;
        //const From = this.props.user.Name;
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