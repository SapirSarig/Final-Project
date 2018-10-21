import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './myAuctions.css';
// import NavToggle from "../../navToggle/navToggle";
import FixedHeader from '../../../common/fixedHeader/fixedHeader';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: '100%',
        height: '100vh',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    }
});

class myAuctions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            styleMargin: {
                marginTop:'100px',
            }
        };
    }

    componentWillMount(){
        if(this.props.title === "All Auctions"){
            this.setState({styleMargin: {marginTop:'40px'}});
        }
    }

    render() {
        const { classes, location, auctions, title, user } = this.props;
        const theAuctions = (location && location.state.auctions) || auctions;
        const theTitle = (location && location.state.title) || title;
        const theUser = (location && location.state.user) || user;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                {/* <NavToggle /> */}
                <FixedHeader />  
                <div className="myAuctionsContainer" style={this.state.styleMargin}>
                    <div className="myAuctionsTitle">
                        {theTitle}
                    </div>
                    <div className="auctionsWrapper">                    
                        {theAuctions && theAuctions.map((auction) =>
                            auction.Status !== "Deleted" && <div className="myAuctionWrapper">
                                <TextField
                                    id="nameAuction"
                                    label="Auction's name"
                                    defaultValue={auction.Title}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                
                                <div className="btnWrapper">
                                    <div className="detailsContainer ">                                    
                                        <Link className="detailsBtn designBtn" to={{ pathname: "/auction", state: { auction: auction, isNew: false, user:theUser } }}>
                                            Details
                                        </Link>
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        );
    }
}

myAuctions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(myAuctions);