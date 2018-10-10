import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LayoutButton from '../../../common/layoutButton/layoutButton';
import './allOffers.css';
import OfferService from '../../../services/apis/OfferService';

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
    offerService;
    constructor(props) {
        super(props);

        // this.offers = [{
        //     date: '1.9.18',
        //     nameOfAuction: 'Tal',
        //     numOfAuction: '1000'
        // }, {
        //     date: '3.9.18',
        //     nameOfAuction: 'Tal2',
        //     numOfAuction: '1100'
        // }];
        this.state = {
            user: {},
            offers: []
        }
        this.getAllOffersForUser = this.getAllOffersForUser.bind(this);
        this.offerService = new OfferService();
    }

    componentDidMount() {
        const { user } = this.props.location.state;
        this.setState({ user });
        this.getAllOffersForUser(user);
    }

    getAllOffersForUser(user) {
        if (user.Type === "Social Influencer") {
            this.offerService.getAllOffersByUserId(user.Id).then(req => {
                this.setState({ offers: req });
            });
        }
        else { //TODO
            this.offerService.getAllOffersForAllAuctions(user.Id).then(req => {
                this.setState({ offers: req });
            });
        }

    }

    render() {
        const { classes } = this.props;
        const { offers } = this.state;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div className="offersTitleContainer">
                    <div className="offersTitle">
                        Offers
                    </div>
                </div>
                {offers && offers.map((offer) =>
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

AllOffers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllOffers);