
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

        this.isUserHasPic = this.isUserHasPic.bind(this);
    }

    
    isUserHasPic(user){
        return (user && user.Picture && user.Picture !== "string" && user.Picture !== "no pic")
    }

    render() {
        const { classes, location, users } = this.props;
        const theUsers  = (location && location.state.users) || users;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div className="allUsersTitle">
                    {this.props.title}
                </div>
                {console.log(theUsers)}
                <div className="auctionsWrapper">
                    {theUsers && theUsers.map((user) =>
                        <div className="myAuctionWrapper">
                            <div className="firstLine">
                                <TextField
                                    id="nameAuction"
                                    label="User's name"
                                    defaultValue= {user.Name}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />                                    
                                {this.isUserHasPic(user) ?
                                <div className="userPicWrapper">
                                    <img src={user.Picture} className="userPic"/>
                                </div> :
                                <svg width="32" height="32" viewBox="0 0 32 32" className="userProfileIconInSearch">
                                    <path d="M14 0c7.734 0 14 6.266 14 14 0 7.688-6.234 14-14 14-7.75 0-14-6.297-14-14 0-7.734 6.266-14 14-14zM23.672 21.109c1.453-2 2.328-4.453 2.328-7.109 0-6.609-5.391-12-12-12s-12 5.391-12 12c0 2.656 0.875 5.109 2.328 7.109 0.562-2.797 1.922-5.109 4.781-5.109 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c2.859 0 4.219 2.312 4.781 5.109zM20 11c0-3.313-2.688-6-6-6s-6 2.688-6 6 2.688 6 6 6 6-2.688 6-6z">
                                    </path>
                                </svg>
                                }
                            </div>
                            <div className="detailsWrapper">
                                <Link className="detailsLink designBtn" to={{ pathname: "/Profile", state: {user:user, okDisabled:false} }}>
                                    Details
                                </Link>
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