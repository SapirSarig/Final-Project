import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import './myAuctions.css';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      width: '100%'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 250,
    }
});

class myAuctions extends Component {

    constructor(props){
        super(props);

        // this.auctions = [{
        //     nameOfAuction: 'Tal',
        // }, {
        //     nameOfAuction: 'Tal2',
        // },{
        //     nameOfAuction: 'Tal3',
        // },{
        //     nameOfAuction: 'Tal4',
        // }];
    }

    render() {
        const { classes, location, auctions, title } = this.props;
        const theAuctions  = (location && location.state.auctions) || auctions;
        const theTitle = (location && location.state.title) || title;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div className="myAuctionsTitleContainer">
                    <div className="myAuctionsTitle">
                        {theTitle}
                    </div>
                </div>
                <div className="auctionsWrapper">
                {console.log("theAuctions", theAuctions)}
                    {theAuctions && theAuctions.map((auction) =>
                        <div className="myAuctionWrapper">
                            <TextField
                                id="nameAuction"
                                label="Auction's name"
                                defaultValue= {auction.Title}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {console.log("inside", auction)}
                            <div className="btnWrapper">
                                <div className="detailsContainer ">
                                    <div className="detailsBtn designBtn">
                                        Details
                                    </div>
                                </div>
                                <div className="offersContainer">
                                    <div className="OffersBtn designBtn">
                                        Offers 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        );
    }
}

myAuctions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(myAuctions);