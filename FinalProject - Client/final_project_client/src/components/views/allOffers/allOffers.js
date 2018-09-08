import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import './allOffers.css';

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

class AllOffers extends Component {

    constructor(props){
        super(props);

        this.offers = [{
            date: '1.9.18',
            nameOfAuction: 'Tal',
            numOfAuction: '1000'
        }, {
            date: '3.9.18',
            nameOfAuction: 'Tal2',
            numOfAuction: '1100'
        }];
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div className="offersTitleContainer">
                    <div className="offersTitle">
                        Offers
                    </div>
                </div>
                {this.offers.map((offer) =>
                    <div className="offerWrapper">
                        <TextField
                            id="date"
                            label="Date"
                            defaultValue= {offer.date}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="nameAuction"
                            label="Auction's name"
                            defaultValue= {offer.nameOfAuction}
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
                                defaultValue= {offer.numOfAuction}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <div className="goToOfferContainer">
                                <div className="goToOfferBtn designBtn">
                                    Go To Offer 
                                </div>
                            </div>
                        </div>
                        <div className="separatorLine"></div>
                    </div>
                )}
            </form>
        );
    }
}

AllOffers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllOffers);