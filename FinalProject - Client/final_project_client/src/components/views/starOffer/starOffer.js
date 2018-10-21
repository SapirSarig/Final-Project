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
import UserSerive from '../../../services/apis/UserService';
import NegotiationPage from '../../negotiation/NegotiationPage';
import SessionStorageUtil from '../../../utils/SessionStorageUtil';
import NegotiationService from '../../../services/apis/NegotiationService';
// import NavToggle from "../../navToggle/navToggle";
import FixedHeader from '../../../common/fixedHeader/fixedHeader';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        width: '100%',
        paddingTop: '100px',
        paddingLeft: '100px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});

class starOffer extends Component {
    offerService;
    userSerive;
    negotiationService;
    constructor(props) {
        super(props);
        this.negotiationService = new NegotiationService();
        this.state = {
            offer: {
                UserId: '',
                AuctionId: '',
                AdvertisingForms: [],
                Description: '',
                PublishSocialNetworks: [],
                Payment: '',
                Status: 'Pending'

            },
            AuctionName: '', //props
            StarName: '', //props
            offerOk: false,
            OfferId: '',
            OfferStatusUpdated: false,
            offerDeleted: false,
            openNegotiation: false,
            offerAccepted:false,
            offerDeclined: false,
            auctionStatus:''
            //chat: {}

        };
        this.offerService = new OfferService();
        this.userSerive = new UserSerive();
        this.handleChange = this.handleChange.bind(this);
        this.checkIfChecked = this.checkIfChecked.bind(this);
        this.sendOfferClicked = this.sendOfferClicked.bind(this);
        this.isAllValid = this.isAllValid.bind(this);
        this.acceptClicked = this.acceptClicked.bind(this);
        this.declinedClicked = this.declinedClicked.bind(this);
        this.deleteOfferClicked = this.deleteOfferClicked.bind(this);
        this.openNegotiation = this.openNegotiation.bind(this);
    }

    componentDidMount() {
        const { fromBusiness, fromAllOffers } = this.props.location.state;
        let { offer, AuctionName, StarName, OfferId } = this.state;

        if (fromBusiness || fromAllOffers) {
            const { currOffer } = this.props.location.state;
            offer.AdvertisingForms = currOffer.AdvertisingForms;
            offer.AuctionId = currOffer.AuctionId;
            offer.Description = currOffer.Description;
            offer.Payment = currOffer.Payment;
            offer.PublishSocialNetworks = currOffer.PublishSocialNetworks;
            offer.UserId = currOffer.UserId;
            offer.Status = currOffer.Status;
            AuctionName = currOffer.Auction.Title;
            StarName = currOffer.InfluencerUser.Name;
            OfferId = currOffer.Id
        }
        else {
            const { auction, user } = this.props.location.state;
            offer.AuctionId = auction.Id;
            offer.UserId = user.user ? user.user.Id : user.Id; //check why
            AuctionName = auction.Title;
            StarName = user.user ? user.user.Name : user.Name; //check why
        }
        if (OfferId !== "") {
            this.offerService.getOfferById(OfferId).then(req => {
                if (req) {
                    if (req.Message) {
                        alert(req.Message);
                    }
                    else {
                        this.setState({
                            openNegotiation: req.IsOpenNegotiation,
                            offerAccepted: req.Status === "Accepted" ? true : false
                        });
                    }
                }
            });         
        }

        this.setState({
            AuctionName,
            StarName,
            offer,
            OfferId
        });
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
        const { offer } = this.state;
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
                        offer.AdvertisingForms.splice(index,  1);
                }
                else {
                    const index = offer.PublishSocialNetworks.findIndex(socialNetwork => socialNetwork.Value === name);
                    if (index !== -1)
                        offer.PublishSocialNetworks.splice(index,  1);
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

    acceptClicked() {
        let r = window.confirm("By accepting the offer you commit to pay the social influencer after your product is published");
        let status;
        if (r == true) {
            status = "Accepted";
            const { OfferId, AuctionName } = this.state;
            this.offerService.updateOffer(OfferId, status).then(updateOfferReq => {
                if (updateOfferReq) {
                    if (updateOfferReq.Message) {
                        alert(updateOfferReq.Message);
                    }
                    else {
                        
                        this.userSerive.sendMailToInfluencerUser(OfferId, AuctionName).then(req => {
                            if (req) {
                                if (req.Message) {
                                    alert(req.Message);
                                }
                                else {
                                    alert("The offer was accepted succefully!");
                                    //this.setState({ OfferStatusUpdated: true });
                                    this.openNegotiation();
                                    this.setState({offerAccepted: updateOfferReq.Status === "Accepted" ? true : false});
                                     
                                }
                            }
                        });         
                    }
                }
                else {
                    alert("Server Error");
                }

            });
        }
    }
    declinedClicked() {
        let r = window.confirm("Are you sure that you want to decline the offer?");
        let status;
        if (r == true) {
            status = "Declined";
            const { OfferId } = this.state;
            this.offerService.updateOffer(OfferId, status).then(req => {
                if (req) {
                    if (req.Message) {
                        alert(req.Message);
                    }
                    else {
                        alert("The offer was declined succefully");
                        this.setState({ OfferStatusUpdated: true ,
                            offerDeclined : req.Status === "Declined" ? true : false});
                    }
                }
                else {
                    alert("Server Error");
                }

            });
        }
    }


    sendOfferClicked() {
        let r = window.confirm("By sending the offer you commit to publish the product if the business owner accepts your offer");
        let status;
        if (r == true) {
            const { offer } = this.state;
            this.offerService.createOffer(offer).then(req => {
                if (req) {
                    if (req.Message) {
                        alert(req.Message);
                    }
                    else {
                        alert("Your offer was submitted succefully!");
                        this.userSerive.sendMailToBusinessUser(offer.AuctionId).then(req => {
                            if (req) {
                                if (req.Message) {
                                    alert(req.Message);
                                }
                            }
                            else {
                                this.setState({ offerOk: true });
                            }
                        });
                        this.setState({ offerOk: true });

                    }
                }
                else {
                    alert("Server Error");
                }

            });
        }
    }

    deleteOfferClicked() {
        const { OfferId } = this.state;
        this.offerService.deleteOffer(OfferId).then(req => {
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {
                    alert("Your offer was deleted succefully!");
                    this.setState({
                        offerDeleted: true,
                    });
                }

            }
            else {
                alert("Server Error");
            }
        });
    }

    openNegotiation() {
        this.negotiationService.createChat(this.state.OfferId).then(req => {
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {
                    this.setState({
                        chat: req
                    });
                    this.offerService.updateIsOpenNegotiations(this.state.OfferId).then(req => {
                        if (req) {
                            if (req.Message) {
                                alert(req.Message);
                            }
                            else {
                                this.setState({ openNegotiation: req.IsOpenNegotiation })
                            }
                        }
                    });
                }
            }
        });
        

        
    }

    render() {
        const { classes } = this.props;
        const { fromBusiness, fromAllOffers, user } = this.props.location.state;
        let { offer, AuctionName, StarName, offerOk, OfferStatusUpdated, offerDeleted, openNegotiation, OfferId, offerAccepted, offerDeclined } = this.state;
        return (
            <div className="offerWrapper">
                {/* <NavToggle /> */}
                <FixedHeader />
                {(!offerOk && !OfferStatusUpdated && !offerDeleted) ?
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
                                    <input type="checkbox" checked={this.checkIfChecked("Video", "AdvertisingForms")} value="Video" id="checkboxVideoInput" name="AdvertisingForms" onChange={(fromAllOffers || fromBusiness) ? undefined : this.handleChange} />
                                    <label for="checkboxVideoInput"></label>
                                </div>
                                <div className="descTitle">Video</div>
                            </div>
                            <div className="picture accessoriestWrapper">
                                <div className="checkboxforaccessories">
                                    <input type="checkbox" checked={this.checkIfChecked("Picture", "AdvertisingForms")} value="Picture" id="checkboxFPictureInput" name="AdvertisingForms" onChange={(fromAllOffers || fromBusiness) ? undefined : this.handleChange} />
                                    <label for="checkboxFPictureInput"></label>
                                </div>
                                <div className="descTitle">Picture</div>
                            </div>
                            <div className="post accessoriestWrapper">
                                <div className="checkboxforaccessories">
                                    <input type="checkbox" checked={this.checkIfChecked("Post", "AdvertisingForms")} value="Post" id="checkboxPostInput" name="AdvertisingForms" onChange={(fromAllOffers || fromBusiness) ? undefined : this.handleChange} />
                                    <label for="checkboxPostInput"></label>
                                </div>
                                <div className="descTitle">Post</div>
                            </div>
                        </div>
                        <SocialMedia isExtra="false" socialNetworks={offer.PublishSocialNetworks} onChange={(fromAllOffers || fromBusiness) ? undefined : this.handleChange} checkIfChecked={this.checkIfChecked} starOffer={true} />
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
                                readOnly: (fromAllOffers || fromBusiness) ? true : false,
                            }}
                        />
                        <TextField
                            id="payment"
                            name="Payment"
                            label="Initial Payment ($) *"
                            value={offer.Payment}
                            onChange={this.handleChange}
                            type="number"
                            className={classes.textField}
                            margin="normal"
                            style={{ width: '80%' }}
                            InputProps={{
                                readOnly: (fromAllOffers || fromBusiness) ? true : false,
                            }}
                        />
                        {
                            openNegotiation && <NegotiationPage user={SessionStorageUtil.GetLoggedUser()} OfferId={OfferId} offerAccepted={offerAccepted}/>
                        }

                        <div className="btnContainer">
                            {/* className={`${this.isAllValid() ? "" : "disableElement"}`} */}
                            {!(fromAllOffers || fromBusiness) && <LayoutButton text="Send Offer" onClick={this.sendOfferClicked} />}
                            {(fromAllOffers && !fromBusiness && !offer.Status==="Accepted") && <LayoutButton text="Delete Offer" onClick={this.deleteOfferClicked} />}
                            {fromBusiness && !offerAccepted && !offerDeclined && !openNegotiation && offer.Status === "Pending" && <LayoutButton text="Accept" onClick={this.acceptClicked} />}
                            {fromBusiness && !offerAccepted && !offerDeclined && !openNegotiation && offer.Status === "Pending" && <LayoutButton text="Decline" onClick={this.declinedClicked} />}
                            {fromBusiness && !offerAccepted && !offerDeclined && !openNegotiation && offer.Status === "Pending" && <LayoutButton text="Open Negotiation" onClick={this.openNegotiation} />}
                        </div>
                    </div> :
                    (offerOk || offerDeleted) ?
                        <Redirect to={{
                            pathname: '/influencerHomePage',
                            state: { user: this.props.location.state.user.user ? this.props.location.state.user.user : this.props.location.state.user }//check why
                        }} /> :
                        offerDeclined && (<Redirect to={{
                            pathname: '/businessHomePage',
                            state: { user }//check why
                        }} />)}
            </div>
        );
    }
}

starOffer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(starOffer);