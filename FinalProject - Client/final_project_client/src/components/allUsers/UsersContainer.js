
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import './UsersContainer.css';

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

class UsersContainer extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { classes, location, users } = this.props;
        const theUsers  = (location && location.state.users) || users;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                {/* <div className="myAuctionsTitleContainer">
                    <div className="myAuctionsTitle">
                        My Auctions
                    </div>
                </div> */}
                {console.log(theUsers)}
                <div className="auctionsWrapper">
                    {theUsers && theUsers.map((user) =>
                        <div className="myAuctionWrapper">
                            <TextField
                                id="nameAuction"
                                label="Auction's name"
                                defaultValue= {user.Name}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {console.log("inside", user)}
                            <div className="btnWrapper">
                                <div className="detailsContainer ">
                                    <div className="detailsBtn designBtn">
                                        Details
                                    </div>
                                </div>
                                <div className="offersContainer">
                                    <div className="OffersBtn designBtn">
                                        -Pic Here- 
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

UsersContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersContainer);