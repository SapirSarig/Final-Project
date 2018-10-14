
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Negotiation.css';

class Message extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { message, isReview} = this.props;
        return (
            <div>
                <div className="messageFromHistory">
                    <div> <span className="messageTitles"> From: </span> {message.From}</div>
                    <div> <span className="messageTitles"> At: </span> {message.TimeSent} </div>
                    <div className="messageTitles"> {isReview? "Review:" :"Message:"} </div>
                    {message.Text.split("\n").map((item, index) =>
                        <span key={index}>
                            {item}
                            <br />
                        </span>
                        )
                    }
                </div>
                        <br />
            </div>
                );
            }
        }
        
export default Message;