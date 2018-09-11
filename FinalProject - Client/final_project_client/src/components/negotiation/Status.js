
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Negotiation.css';

class Status extends Component {

    constructor(props) {
        super(props);
        this.state = {
            influcerCheck: false,
            BussniessCheck: false,
            disablePostCheckBox:true,
        }

        this.influcerChecked = this.influcerChecked.bind(this);
        this.BussniessChecked = this.BussniessChecked.bind(this);
        this.PostedChecked = this.PostedChecked.bind(this);
    }

    BussniessChecked(event) {
        this.setState({ BussniessCheck: true });
        if(this.state.influcerCheck)
        {
            this.setState({ disablePostCheckBox: false });
        }
    }

    PostedChecked(event) {
        this.setState({
            disablePostCheckBox: true
        });
    }

    influcerChecked(event) {
        this.setState({ influcerCheck: true });
        if(this.state.BussniessCheck)
        {
            this.setState({ disablePostCheckBox: false });
        }
    }

    render() {
        const { BussniessCheck, influcerCheck, disablePostCheckBox } = this.state;
        return (
            <div className="Status">
                <div>
                    <span className="title"> Influncer Agrees </span>
                    <input className="CheckBox" disabled={influcerCheck} type="checkbox" onChange={this.influcerChecked} />
                </div>
                <div>
                    <span className="title"> Bussniess Agrees </span>
                    <input className="CheckBox" disabled={BussniessCheck} type="checkbox" onChange={this.BussniessChecked} />
                </div>
                <div>
                    <span className="title"> Posted! </span>
                    <input className="CheckBox" disabled={disablePostCheckBox} type="checkbox" onChange={this.PostedChecked} />
                </div>
                <div className="sepratorLine"></div>
            </div>
        );
    }
}

export default Status;