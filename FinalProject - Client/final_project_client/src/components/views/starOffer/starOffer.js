import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import LayoutButton from '../../../common/layoutButton/layoutButton';
import './starOffer.css';
import SocialMedia from '../../../common/socialMedia/socialMedia';
import OfferService from '../../../services/apis/OfferService';
import StringUtil from '../../../utils/StringUtil';
import socialMedia from '../../../common/socialMedia/socialMedia';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});

class starOffer extends Component {
    offerService;

    constructor(props) {
        super(props);

        this.state = {
            offer: {
                UserId: '',
                AuctionId: '',
                AdvertisingForms: [],
                Description: '',
                PublishSocialNetworks: [],
                Payment: ''

            },
            AuctionName: '', //props
            StarName: '', //props
            offerOk: false

        };
        this.offerService = new OfferService();
        this.handleChange = this.handleChange.bind(this);
        this.checkIfChecked = this.checkIfChecked.bind(this);
        this.sendOfferClicked = this.sendOfferClicked.bind(this);
        this.isAllValid = this.isAllValid.bind(this);
    }

    componentDidMount() {
        const { fromBusiness, fromAllOffers } = this.props.location.state;
        let { offer, AuctionName, StarName } = this.state;

        if (fromBusiness || fromAllOffers) {
            const { currOffer } = this.props.location.state;
            offer.AdvertisingForms = currOffer.AdvertisingForms;
            offer.AuctionId = currOffer.AuctionId;
            offer.Description = currOffer.Description;
            offer.Payment = currOffer.Payment;
            offer.PublishSocialNetworks = currOffer.PublishSocialNetworks;
            offer.UserId = currOffer.UserId;
            AuctionName = currOffer.Auction.Title,
                StarName = currOffer.InfluencerUser.Name;
        }
        else {
            const { auction, user } = this.props.location.state;
            offer.AuctionId = auction.Id;
            offer.UserId = user.user.Id; //check why
            AuctionName = auction.Title;
            StarName = user.user.Name; //check why
        }
        this.setState({
            AuctionName,
            StarName,
            offer
        });
        console.log("#$#$#$$$", offer);

    }

    isAllValid() {
        const { offer } = this.state;
        if (StringUtil.isEmptyString(offer.Description)
            || StringUtil.isEmptyString(offer.Payment)
            || offer.AdvertisingForms.length === 0
            || offer.PublishSocialNetworks.length === 0) {
            return false;
        }
        return true;
    }

    checkIfChecked(value, arrName) {
        let arr;
        // if (arrName === "PublishSocialNetworks") {
        //     const { PublishSocialNetworks } = this.state;
        //     arr = PublishSocialNetworks;
        // }
        // else{
        //     const { AdvertisingForms } = this.state;
        // }
        const {offer} = this.state;
        arr = offer[arrName];
        
        //if (Object.getOwnPropertyNames(userInfo).length > 0) {
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].Value === value) {
                    return true;
                }
            }
            return false;
        }
        //}
        return false;


    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { offer } = this.state;
        if (target.type === "checkbox") {
            if (target.checked) {
                if (name === "AdvertisingForms") {
                    offer.AdvertisingForms.push({ Value: value });
                }
                else {
                    offer.PublishSocialNetworks.push({ Value: name });
                }
            }
            else {
                
                if (name === "AdvertisingForms") {
                    const index = offer.AdvertisingForms.findIndex(advfrm => advfrm.Value === value);
                    if (index !== -1)
                        offer.AdvertisingForms.splice(index, index + 1);
                }
                else {
                    const index = offer.PublishSocialNetworks.findIndex(socialNetwork => socialNetwork.Value === name);
                    if (index !== -1)
                        offer.PublishSocialNetworks.splice(index, index + 1);
                }
            }
        }
        else {
            offer[name] = value;
            
        }
        this.setState({
            offer
        });
    }

    sendOfferClicked() {
        const { offer } = this.state;
        this.offerService.createOffer(offer).then(req => {
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {
                    alert("Your offer was submitted succefully!");
                    this.setState({ offerOk: true });
                }
            }
            else {
                alert("Server Error");
            }

        });
    }

    render() {
        const { classes } = this.props;
        const { fromBusiness, fromAllOffers } = this.props.location.state;
        let { offer, AuctionName, StarName, offerOk } = this.state;
        return (
            <div className="offerWrapper">
                {!offerOk ?
                    <div className={classes.container} noValidate autoComplete="off">
                        <div className="firstLineWrapper">
                            <TextField
                                id="read-only-input"
                                label="Offer for auction number:"
                                value={offer.AuctionId}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{ width: '30%' }}
                            />
                            {/* {!fromBusiness && <LayoutButton text="Edit offer" />} */}
                        </div>
                        <TextField
                            id="read-only-input"
                            label="Auction's title"
                            value={AuctionName}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ width: '30%' }}
                        />
                        <TextField
                            id="read-only-input"
                            label="Star's name"
                            value={StarName} //check why
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ width: '30%' }}
                        />
                        <div className="separatorLine"></div>
                        <label>Form of Advertising: *</label>
                        <div className="accessoriesContainer">
                            <div className="video accessoriestWrapper">
                                <div className="checkboxforaccessories">
                                    <input type="checkbox" checked={this.checkIfChecked("Video","AdvertisingForms")}value="Video" id="checkboxVideoInput" name="AdvertisingForms" onChange={ (fromAllOffers || fromBusiness)? undefined : this.handleChange} />
                                    <label for="checkboxVideoInput"></label>
                                </div>
                                <div className="descTitle">Video</div>
                            </div>
                            <div className="picture accessoriestWrapper">
                                <div className="checkboxforaccessories">
                                    <input type="checkbox" checked={this.checkIfChecked("Picture", "AdvertisingForms")} value="Picture" id="checkboxFPictureInput" name="AdvertisingForms" onChange={ (fromAllOffers || fromBusiness)? undefined : this.handleChange} />
                                    <label for="checkboxFPictureInput"></label>
                                </div>
                                <div className="descTitle">Picture</div>
                            </div>
                            <div className="post accessoriestWrapper">
                                <div className="checkboxforaccessories">
                                    <input type="checkbox" checked={this.checkIfChecked("Post","AdvertisingForms")} value="Post" id="checkboxPostInput" name="AdvertisingForms" onChange={ (fromAllOffers || fromBusiness)? undefined : this.handleChange} />
                                    <label for="checkboxPostInput"></label>
                                </div>
                                <div className="descTitle">Post</div>
                            </div>
                        </div>
                        <SocialMedia isExtra="false" socialNetworks={offer.PublishSocialNetworks} onChange={ (fromAllOffers || fromBusiness)? undefined : this.handleChange} checkIfChecked={this.checkIfChecked} starOffer={true} />
                        <TextField
                            id="offerDescription"
                            name="Description"
                            label="Offer's Description *"
                            multiline
                            rowsMax="8"
                            value={offer.Description}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin="normal"
                            style={{ width: '80%' }}
                            InputProps={{
                                readOnly:  (fromAllOffers || fromBusiness)? true:false,
                            }}
                        />
                        <TextField
                            id="payment"
                            name="Payment"
                            label="Payment ($) *"
                            value={offer.Payment}
                            onChange={this.handleChange}
                            type="number"
                            className={classes.textField}
                            margin="normal"
                            style={{ width: '80%' }}
                            InputProps={{
                                readOnly: (fromAllOffers || fromBusiness)? true:false,
                            }}
                        />
                        <div className="btnContainer">
                        {/* className={`${this.isAllValid() ? "" : "disableElement"}`} */}
                            {!(fromAllOffers || fromBusiness) && <LayoutButton text="Send Offer" onClick={this.sendOfferClicked} />}
                            {!(fromAllOffers || fromBusiness) && <LayoutButton text="Open negotiaition" />}
                        </div>
                    </div> :
                    <Redirect to={{
                        pathname: '/influencerHomePage',
                        state: { user: this.props.location.state.user.user }//check why
                    }} />}
            </div>
        );
    }
}

starOffer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(starOffer);