import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import LayoutButton from '../../../common/layoutButton/layoutButton';

import './starOffer.css';

import SocialMedia from '../../../common/socialMedia/socialMedia';

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
    constructor(props) {
        super(props);

        this.state = {
            offer:{
                AuctionName: '', //props
                StarName:'', //props
                AdvertisingForms:[],
                Description: '',
                PublishSocialNetworks:[],
                Payment: ''
                
            }
           
        };
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { offer } = this.state;
        
        offer[name] = value;
        this.setState({
            offer
        });
    }

    render() {
        const { classes } = this.props;
        let {offer} = this.state;
        return (
            <div className="offerWrapper">
                <form className={classes.container} noValidate autoComplete="off">
                    <div className="firstLineWrapper">
                        <TextField
                            id="read-only-input"
                            label="Offer for auction number:"
                            defaultValue="1000"
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ width: '30%' }}
                        />
                        <LayoutButton text="Edit offer" />
                    </div>
                    <TextField
                        id="read-only-input"
                        label="Auction name"
                        defaultValue= {offer.AuctionName}
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
                        defaultValue={offer.StarName}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{ width: '30%' }}
                    />
                    <div className="separatorLine"></div>
                    <label>Form of Advertising:</label>
                    <div className="accessoriesContainer">
                        <div className="video accessoriestWrapper">
                            <div className="checkboxforaccessories">
                                <input type="checkbox" value="1" id="checkboxVideoInput" name="" />
                                <label for="checkboxVideoInput"></label>
                            </div>
                            <div className="descTitle">Video</div>
                        </div>
                        <div className="picture accessoriestWrapper">
                            <div className="checkboxforaccessories">
                                <input type="checkbox" value="2" id="checkboxFPictureInput" name="" />
                                <label for="checkboxFPictureInput"></label>
                            </div>
                            <div className="descTitle">Picture</div>
                        </div>
                        <div className="post accessoriestWrapper">
                            <div className="checkboxforaccessories">
                                <input type="checkbox" value="3" id="checkboxPostInput" name="" />
                                <label for="checkboxPostInput"></label>
                            </div>
                            <div className="descTitle">Post</div>
                        </div>
                    </div>
                    <SocialMedia isExtra="false"/>
                    <TextField
                        id="offerDescription"
                        name="Description"
                        label="Offer's Description"
                        multiline
                        rowsMax="8"
                        value={offer.Description}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        style = {{width: '80%'}}
                    />
                    <TextField
                                id="payment"
                                name="Payment"
                                label="Payment ($)"
                                value={offer.Payment}
                                onChange={this.handleChange}
                                type="number"
                                className={classes.textField}
                                margin="normal"
                                style={{ width: '80%' }}
                            />
                    <div className="btnContainer">
                        <LayoutButton text="Send Offer" />
                        <LayoutButton text="Open negotiaition" />
                    </div>
                </form>
            </div>
        );
    }
}

starOffer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(starOffer);