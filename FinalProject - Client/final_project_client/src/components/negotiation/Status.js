
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            businessPrice: '',
            influencerPrice: '',
            priceSettled: false
        }
        this.offerService = new OfferService();
        this.PostedChecked = this.PostedChecked.bind(this);
        this.handleOkClicked = this.handleOkClicked.bind(this);
        this.getstatuscontent = this.getstatuscontent.bind(this);
    }

    componentDidMount() {
        let user = SessionStorageUtil.GetLoggedUser();
        this.setState({ user });
        setInterval(this.getstatuscontent, 1000);
    }

    getstatuscontent() {
        const { offerId } = this.props;
        this.offerService.getOfferById(offerId).then(req => {
            if (req) {
                if (req.message) {
                    alert(req.message);
                }
                else {
                    this.setState({
                        businessPrice: req.BusinessPrice,
                        influencerPrice: req.InfluencerPrice,
                    })
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
        const { user } = this.state;
        const { offerId } = this.props;
        let influencerElem = document.getElementById("InfluencerPrice");
        let influencerValue = influencerElem.value;
        let businessElem = document.getElementById("BusinessPrice");
        let businessValue = businessElem.value;

        this.offerService.updatePrice(offerId, user.Type, user.Type === "Business Owner" ? businessValue : influencerValue).then(req => {
            if (req) {
                if (req.message) {
                    alert(req.message);
                }
                else {
                    this.setState({
                        businessPrice: req.BusinessPrice,
                        influencerPrice: req.InfluencerPrice,
                    });
                    if (this.state.influencerPrice === this.state.businessPrice) {
                       
                        this.setState({ priceSettled: true })
                    }
                }

            }
            else {
                alert("Server error!");
            }
        });

    }

    render() {
        const { classes } = this.props;
        const { disablePostCheckBox, user, businessPrice, influencerPrice, priceSettled } = this.state;
        return (
            <div className="Status">
                <div>
                    <span className="title"> Influncer's Price: </span>
                    <TextField
                        id="InfluencerPrice"
                        name="InfluencerPrice"
                        defaultValue={`${influencerPrice}`}
                        //value={theAuction.NumOfMinFollowers}
                        onChange={this.handleChange}
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
                    {!priceSettled && <LayoutButton text="Ok" onClick={this.handleOkClicked} />}
                </div>
                <div>
                    <span className="title"> Bussniess' Price: </span>
                    <TextField
                        id="BusinessPrice"
                        name="BusinessPrice"
                        defaultValue={`${businessPrice}`}
                        //value={theAuction.NumOfMinFollowers}
                        onChange={this.handleChange}
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
                    {!priceSettled && <LayoutButton text="Ok" onClick={this.handleOkClicked} />}
                    {priceSettled && 
                    <div>
                        {(user.Type === "Business Owner")? 
                            <span>Congratulations! You have settled the price. The Influencer must now publish your product. Please return to this chat to settle the payment.</span>
                        :   <span>Congratulations! You have settled the price. Please publish the product and return to this chat to settle the payment.</span>
                        }}
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