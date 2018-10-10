import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OfferInList from './offerInList';
import './offersList.css';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import LayoutButton from '../../common/layoutButton/layoutButton';

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


class OffersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        const { offers, location } = this.props;
        const theOffers = (location && location.state.offers) || offers;

        return (
            //To Remove:
            // offers && offers.length > 0 ? <div className="offersList">
            //     {offers.map((offer,index) =>
            //         <OfferInList key ={index} offer={offer} />)
            //     }
            // </div> : <div>No Offers Yet!</div>

            <form className={classes.container} noValidate autoComplete="off">
                <div className="offersTitleContainer">
                    <div className="offersTitle">
                        Offers
                    </div>
                </div>
                {theOffers && theOffers.map((offer) =>
                    <div className="offerWrapper">
                        {/* <TextField
                            id="date"
                            label="Date"
                            defaultValue= {offer.date}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        /> */}
                        <TextField
                            id="offerDescription"
                            label="Offer's description"
                            defaultValue={offer.Description}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="nameAuction"
                            label="Auction's name"
                            defaultValue={offer.Auction.Title}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <div className="bottomWrapper">
                            <TextField
                                id="numberAuction"
                                label="Auction's number"
                                defaultValue={offer.Auction.Id}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <Link className="goToStarOffer" to="/starOffer">
                                <LayoutButton text="Go To Offer" />
                            </Link>
                        </div>
                        <div className="separatorLine"></div>
                    </div>
                )}
            </form>
        );
    }
}

OffersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OffersList);
