
import React, { Component } from 'react';
import './Negotiation.css';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SessionStorageUtil from "../../utils/SessionStorageUtil";
import LayoutButton from '../../common/layoutButton/layoutButton';
import OfferService from '../../services/apis/OfferService';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});
class Status extends Component {
    offerService;
    constructor(props) {
        super(props);
        this.state = {
            disablePostCheckBox: true,
            user: {},
            businessPrice: { value: '', hasChanged: false },
            influencerPrice: { value: '', hasChanged: false },
            priceSettled: false,
            okClicked: false
        }
        this.offerService = new OfferService();
        this.PostedChecked = this.PostedChecked.bind(this);
        this.handleOkClicked = this.handleOkClicked.bind(this);
        this.getstatuscontent = this.getstatuscontent.bind(this);
        this.handleInputPriceChange = this.handleInputPriceChange.bind(this);
    }

    componentDidMount() {
        let user = SessionStorageUtil.GetLoggedUser();
        this.setState({ user });
        setInterval(this.getstatuscontent, 1000);
    }

    getstatuscontent() {
        const { offerId } = this.props;
        const { businessPrice, influencerPrice } = this.state;
        this.offerService.getOfferById(offerId).then(req => {
            if (req) {
                if (req.message) {
                    alert(req.message);
                }
                else {
                    if (!businessPrice.hasChanged) {
                        this.setState({
                            businessPrice: { value: req.BusinessPrice, hasChanged: false },
                        })
                    }
                    if (!influencerPrice.hasChanged) {
                        this.setState({
                            influencerPrice: { value: req.InfluencerPrice, hasChanged: false },
                        })
                    }
                    influencerPrice.value === businessPrice.value && influencerPrice.value > 0 && businessPrice.value > 0 && this.setState({ priceSettled: true })
                }

            }
            else {
                alert("Server error!");
            }
        });
    }

    PostedChecked(event) {
        this.setState({
            disablePostCheckBox: true
        });
    }


    handleOkClicked() {
        const { user, influencerPrice, businessPrice } = this.state;
        const { offerId } = this.props;
        let influencerValue = influencerPrice.value;
        let businessValue = businessPrice.value;

        this.setState({ okClicked: true });
        this.offerService.updatePrice(offerId, user.Type, user.Type === "Business Owner" ? businessValue : influencerValue).then(req => {
            if (req) {
                if (req.message) {
                    alert(req.message);
                }
                else {
                    this.setState({
                        businessPrice: req.BusinessPrice,
                        influencerPrice: req.InfluencerPrice,
                    }, () =>{
                        if(parseInt(influencerPrice.value) === parseInt(businessPrice.value) && influencerPrice.value > 0 && businessPrice.value > 0){
                            this.setState({ priceSettled: true }, ()=>{
                                this.offerService.updateOffer(offerId, "Accepted").then(req=>{
                                    if (req) {
                                        if (req.message) {
                                            alert(req.message);
                                        }
                                    }
                                    else{
                                        alert("Server error!");
                        
                                    }
                                })

                            });
                        }
                    });   
                     
                }

            }
            else {
                alert("Server error!");
            }
        });

    }

    handleInputPriceChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: { value, hasChanged: true }
        });
    }

    render() {
        const { classes } = this.props;
        const { disablePostCheckBox, user, businessPrice, influencerPrice, priceSettled, okClicked } = this.state;
        return (
            <div className="Status">
                <div>
                    <span className="title"> Influncer's Price: </span>
                    <TextField
                        id="InfluencerPrice"
                        name="influencerPrice"
                        value={influencerPrice.value}
                        //value={theAuction.NumOfMinFollowers}
                        onChange={this.handleInputPriceChange}
                        InputProps={{
                            readOnly: Boolean(user.Type === "Business Owner" || priceSettled)
                        }}
                        type="number" min="0"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <br/>
                    {!priceSettled && okClicked && user.Type === "Social Influencer" && <label>Waiting for response...</label>}
                    {(!priceSettled && user.Type === "Social Influencer") && <LayoutButton text="Send" onClick={this.handleOkClicked} />}
                </div>
                <div>
                    <span className="title"> Bussniess' Price: </span>
                    <TextField
                        id="BusinessPrice"
                        name="businessPrice"
                        value={businessPrice.value}
                        //value={theAuction.NumOfMinFollowers}
                        onChange={this.handleInputPriceChange}
                        InputProps={{
                            readOnly: Boolean(user.Type === "Social Influencer" || priceSettled)
                        }}
                        type="number" min="0"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <br/>
                    {!priceSettled && okClicked && user.Type === "Business Owner" && <label>Waiting for response...</label>}
                    {(!priceSettled && user.Type === "Business Owner") && <LayoutButton text="Send" onClick={this.handleOkClicked} />}
                    {priceSettled &&
                        <div>
                            {(user.Type === "Business Owner") ?
                                <span>Congratulations! You have settled the price. The Influencer must now publish your product. Please return to this chat to settle the payment.</span>
                                : <span>Congratulations! You have settled the price. Please publish the product and return to this chat to settle the payment.</span>
                            }
                        </div>}
                </div>
                <div className="sepratorLine"></div>
            </div>
        );
    }
}
Status.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Status);