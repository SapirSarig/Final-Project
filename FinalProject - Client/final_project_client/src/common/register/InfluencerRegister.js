import React, { Component } from 'react';
import './InfluencerRegister.css';
import RegisterService from '../../services/register/RegisterService';

import FileUploader from '../../components/fileUploader/fileUploader';
import SocialMedia from '../socialMedia/socialMedia';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});

class InfluencerRegister extends Component {
    constructor(props) {
        super(props);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);

        this.state = {
            src:"",
            DateOfBirth: undefined,
            socialNetworks: [],
            errors: {
                LinkToTwitterProfile: "",
                LinkToFacebookProfile: "",
                LinkToInstagramProfile: "",
                LinkToYouTubeProfile: "",
                DateOfBirth: ""
            },
            // userInfo: {
            //     Name: "rinat",
            //     Email: "rinat@gmail.com",
            //     ConfirmEmail: "rinat@gmail.com",
            //     Picture: "string",
            //     Description: "pop",
            //     Type: "Social Influencer",
            //     CompanyName: "cola",
            //     LinkToCompanySite: "www.walla.com",
            //     SocialNetworks: [
            //         {
            //             Value: "Facebook",
            //             LinkToProfile: "www.Facebook.com"
            //         },
            //         {
            //             Value: "Twitter",
            //             LinkToProfile: "www.Facebook.com"
            //         }
            //     ],
            //     Interests: [
            //         {
            //             value: "Sport"
            //         },
            //         {
            //             value: "Music"
            //         }
            //     ]

            // }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.focusElement = this.focusElement.bind(this);
        this.checkIfChecked = this.checkIfChecked.bind(this);
        this.getLink = this.getLink.bind(this);
    }

    componentDidMount() {
        const { userInfo } = this.props;
        this.setState({ socialNetworks: userInfo.SocialNetworks });
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
        let socialNetworkName;

        if (name.startsWith("LinkTo")) {
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
                const currSocialNetwork = socialNetworks.find(sn => sn.Value === socialNetworkName);
                if (currSocialNetwork) {
                    currSocialNetwork.LinkToProfile = value;
                }
            }

            if (this.checkValidation(name, value)) {
                this.setState({ socialNetworks }, () => this.updateChooseTypeState(this.state))
            }
            else {
                this.setState({ socialNetworks })
            }
        } else {
            if (value) {
                if (this.checkValidation(name, value)) {
                    this.setState({ DateOfBirth: value }, () => this.updateChooseTypeState(this.state));
                } else {
                    this.setState({ DateOfBirth: value })
                }
            }

        }
    }

    checkValidation(name, value) {
        const { errors } = this.state;
        let errorMessage;
        if (name.startsWith("LinkTo")) {
            errorMessage = RegisterService.linkValidation(value);
        }
        else if (name === "DateOfBirth") {
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
        const value = (target.type === "checkbox") ? target.checked : target.value;
        const name = target.name;
        const { errors, socialNetworks } = this.state;
        const elementId = `LinkTo${name}Profile`;
        let element = document.getElementById(elementId);
        if (target.checked) {
            socialNetworks.push({ Value: name, LinkToProfile: "" });
            //disabled && (disabled[elementId] = false);
            element && element.focus();
        }
        else {
            element && (element.value = "");
            if (errors && errors[elementId]) {
                errors[elementId] = "";

            }
            const index = socialNetworks.findIndex(socialNetwork => socialNetwork.Value === name);
            if (index !== -1)
                socialNetworks.splice(index, index + 1);
        }
        this.setState({ errors, socialNetworks });
        console.log("@@@@@", this.state);
    }

    checkIfChecked(value) {
        const { userInfo } = this.props;
        const { socialNetworks } = this.state;
        if (Object.getOwnPropertyNames(userInfo).length > 0) {
            if (socialNetworks) {
                for (var i = 0; i < socialNetworks.length; i++) {
                    if (socialNetworks[i].Value === value) {
                        return true;
                    }
                }
                return false;
            }
        }
        return false;


    }

    getLink(value) {
        const { userInfo } = this.props;
        const { socialNetworks } = this.state;
        if (Object.getOwnPropertyNames(userInfo).length > 0) {
            if (socialNetworks) {
                for (var i = 0; i < socialNetworks.length; i++) {
                    if (socialNetworks[i].Value === value) {
                        return socialNetworks[i].LinkToProfile;
                    }
                }
                return "";
            }
        }
        return "";

    }

    render() {
        const { classes, signUp, userInfo } = this.props;
        const { src, DateOfBirth, socialNetworks, errors } = this.state;
        return (
            <div className="influencerContainer">
                <div className="imgWrapper">
                    <span> Image: </span>
                    <FileUploader />
                </div>
                {/* src={Object.getOwnPropertyNames(userInfo).length > 0 ? userInfo.Picture : src} 
                <img id="uploadPreview" src={src} className="logo" />
                <input type="file" name="myFile" onChange={this.handleImgChange} /> */}

                {signUp && <TextField
                    id="birthDate"
                    label="Date Of Birth *"
                    type="date"
                    name="DateOfBirth"
                    className={classes.textField}
                    value={DateOfBirth}
                    onChange={this.handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />}
                {/* <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={this.handleInputChange} /> */}
                <span className="errorInput">{errors["DateOfBirth"]}</span>

                <SocialMedia isExtra="true" onFocus={this.focusElement} onChange={this.handleInputChange} errors={errors} socialNetworks={socialNetworks} getLink={this.getLink} checkIfChecked={this.checkIfChecked}/>
                {/* <span> Social Networks: </span>
                <div className="SocialNetworksContainer">
                    <input type="checkbox" checked={this.checkIfChecked("Twitter")} name="Twitter" onChange={this.focusElement} />
                    <img src={require("../../images/Twitter.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToTwitterProfile" value={this.getLink("Twitter")} disabled={!this.checkIfChecked("Twitter")} type="text" name="LinkToTwitterProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToTwitterProfile"] && errors["LinkToTwitterProfile"]}</span>

                    <br />

                    <input type="checkbox" checked={this.checkIfChecked("Facebook")} name="Facebook" onChange={this.focusElement} />
                    <img src={require("../../images/Facebook.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToFacebookProfile" value={this.getLink("Facebook")} disabled={!this.checkIfChecked("Facebook")} type="text" name="LinkToFacebookProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToFacebookProfile"] && errors["LinkToFacebookProfile"]}</span>
                    <br />

                    <input type="checkbox" checked={this.checkIfChecked("Instagram")} name="Instagram" onChange={this.focusElement} />
                    <img src={require("../../images/Instagram.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToInstagramProfile" value={this.getLink("Instagram")} disabled={!this.checkIfChecked("Instagram")} type="text" name="LinkToInstagramProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToInstagramProfile"] && errors["LinkToInstagramProfile"]}</span>

                    <br />
                    <input type="checkbox" checked={this.checkIfChecked("YouTube")} name="YouTube" onChange={this.focusElement} />
                    <img src={require("../../images/YouTube.png")} className="logo" />
                    <span>Link To Profile:</span>
                    <input id="LinkToYouTubeProfile" value={this.getLink("YouTube")} disabled={!this.checkIfChecked("YouTube")} type="text" name="LinkToYouTubeProfile" onChange={this.handleInputChange} />
                    <span className="errorInput">{errors["LinkToYouTubeProfile"] && errors["LinkToYouTubeProfile"]}</span>

                </div> */}
            </div>
        )
    }
}

InfluencerRegister.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfluencerRegister);