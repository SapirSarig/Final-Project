import React, { Component } from 'react';
import './InfluencerRegister.css';
import Interests from "./Interests";
import RegisterService from '../../services/register/RegisterService';


class InfluencerRegister extends Component {
    constructor(props) {
        super(props);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);

        this.state = {
            src: require('../../images/AddAnImage.png'),
            dateOfBirth: undefined,
            socialNetworks: [],
            errors: {
                LinkToTwitterProfile: "",
                LinkToFacebookProfile: "",
                LinkToInstagramProfile: "",
                LinkToYouTubeProfile: "",
                dateOfBirth: ""
            },
            disabled:{
                LinkToTwitterProfile: true,
                LinkToFacebookProfile: true,
                LinkToInstagramProfile: true,
                LinkToYouTubeProfile: true
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.focusElement = this.focusElement.bind(this);
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
        let { socialNetworks } = this.state;

        if (this.checkValidation(name, value)) {
            if (name.startsWith("LinkTo")) {
                let socialNetworkName;
                if (name.includes("Twitter")) {
                    socialNetworkName = "Twitter";
                }
                else if (name.includes("Facebook")) {
                    socialNetworkName = "Facebook";
                }
                else if (name.includes("Instagram")) {
                    socialNetworkName = "Instagram";
                }
                else {
                    socialNetworkName = "YouTube";
                }

                if (value) {
                    const currSocialNetwork = socialNetworks.find(sn => sn.Name === socialNetworkName);
                    if (currSocialNetwork) {
                        currSocialNetwork.LinkToProfile = value;
                    }
                    else {
                        let obj = {
                            "Value": socialNetworkName,
                            "LinkToProfile": value
                        };
                        socialNetworks.push(obj);
                    }
                }
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
        console.log("$$$$$", this.state);
    }

    checkValidation(name, value) {
        const { errors} = this.state;
        let errorMessage;
        if (name.startsWith("LinkTo")) {
            errorMessage = RegisterService.linkValidation(value);
        }
        else if (name === "dateOfBirth") {
            errorMessage = RegisterService.dateValidation(value);
        }
        errors[name] = errorMessage;
        this.setState({
            errors
        });
        if (errorMessage)
            return false;
        else
            return true;
    }

    updateChooseTypeState(state) {
        const { updateChooseTypeStateObject } = this.props;
        if (true) {
            updateChooseTypeStateObject(state);
        } // validation 
    }

    focusElement(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const {errors, socialNetworks, disabled} = this.state;
        const elementId = `LinkTo${name}Profile`;
        let element = document.getElementById(elementId);
        if (target.checked){
            disabled &&(disabled[elementId] = false);
            element && element.focus();
        }
        else {
            element && (element.value = "");
            if(errors && errors[elementId])
            {
                errors[elementId] = "";
               
            }
            disabled &&(disabled[elementId] = true);
            const index = socialNetworks.findIndex(socialNetwork=>socialNetwork.Value === name);
            if (index!== -1)
                socialNetworks.splice(index, index + 1);
        }
                    this.setState({errors, socialNetworks, disabled});
        console.log("@@@@@" , this.state);
    }

    render() {
        const { src, dateOfBirth, socialNetworks, errors, disabled } = this.state;
        return (
            <div className="Container">
                <span> Image: </span>
                <img id="uploadPreview" src={src} className="logo" />
                <input type="file" name="myFile" onChange={this.handleImgChange} />

                <span> Date Of Birth *</span>
                <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={this.handleInputChange} />
                <span className="errorInput">{errors["dateOfBirth"]}</span>

                <span> Social Networks: </span>
                <div className="SocialNetworksContainer">
                    <input type="checkbox" name="Twitter" onChange={this.focusElement} />
                    <img src={require("../../images/Twitter.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToTwitterProfile" disabled={disabled["LinkToTwitterProfile"]} type="text" name="LinkToTwitterProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToTwitterProfile"] && errors["LinkToTwitterProfile"]}</span>

                    <br />

                    <input type="checkbox" name="Facebook" onChange={this.focusElement} />
                    <img src={require("../../images/Facebook.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToFacebookProfile" disabled={disabled["LinkToFacebookProfile"]} type="text" name="LinkToFacebookProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToFacebookProfile"] && errors["LinkToFacebookProfile"]}</span>
                    <br />

                    <input type="checkbox" name="Instagram" onChange={this.focusElement} />
                    <img src={require("../../images/Instagram.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToInstagramProfile" disabled={disabled["LinkToInstagramProfile"]} type="text" name="LinkToInstagramProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToInstagramProfile"] && errors["LinkToInstagramProfile"]}</span>

                    <br />
                    <input type="checkbox" name="YouTube" onChange={this.focusElement} />
                    <img src={require("../../images/YouTube.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToYouTubeProfile" disabled={disabled["LinkToYouTubeProfile"]} type="text" name="LinkToYouTubeProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToYouTubeProfile"] && errors["LinkToYouTubeProfile"]}</span>

                </div>


            </div>
        )
    }
}

export default InfluencerRegister;