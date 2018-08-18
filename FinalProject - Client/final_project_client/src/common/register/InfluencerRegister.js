import React, { Component } from 'react';
import './InfluencerRegister.css';
import Interests from "./Interests";


class InfluencerRegister extends Component {
    constructor(props) {
        super(props);
        this.handleImgChange = this.handleImgChange.bind(this);

        this.state = {
            src: require('../../images/AddAnImage.png'),
            dateOfBirth: "",
            socialNetworks: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.updateChooseTypeState({});
    }

    handleImgChange(e) {
        let files = e.target.files;
        if (files && files[0]) {
            var reader = new FileReader();

            reader.onload = (r) => {
                this.setState({
                    src: r.target.result
                }, () => this.updateChooseTypeState(this.state));
            }

            reader.readAsDataURL(files[0]);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let {socialNetworks} = this.state;

        if (name === "socialNetworks") {
            value && socialNetworks.push(value);
            this.setState({
                socialNetworks
            }, () => this.updateChooseTypeState(this.state))
        }
        else {
            this.setState({
                [name]: value
            }, () => this.updateChooseTypeState(this.state));
        }
    }

    updateChooseTypeState(state) {
        const { updateChooseTypeStateObject } = this.props;
        if (true) {
            updateChooseTypeStateObject(state);
        } // validation 
    }

    render() {
        const { errors } = this.props;
        const { src, dateOfBirth, socialNetworks } = this.state;
        return (
            <div className="Container">
                <span> Image: </span>
                <img id="uploadPreview" src={src} className="logo" />
                <input type="file" name="myFile" onChange={this.handleImgChange} />

                <span> Date Of Birth </span>
                <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["dateOfBirth"]}</span>

                <span> Social Networks: </span>
                <div className="SocialNetworksContainer">
                    <input type="checkbox" name="socialNetworks" value="Twitter" onChange={this.handleInputChange} />
                    <img src={require("../../images/Twitter.jpg")} className="logo" />
                    <br />
                    <input type="checkbox" name="socialNetworks" value="Facebook" onChange={this.handleInputChange} />
                    <img src={require("../../images/Facebook.png")} className="logo" />
                    <br />
                    <input type="checkbox" name="socialNetworks" value="Instagram" onChange={this.handleInputChange} />
                    <img src={require("../../images/Instagram.png")} className="logo" />
                    <br />
                    <input type="checkbox" name="socialNetworks" value="YouTube" onChange={this.handleInputChange} />
                    <img src={require("../../images/YouTube.png")} className="logo" />

                </div>


            </div>
        )
    }
}

export default InfluencerRegister;