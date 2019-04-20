import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './allOffers.css';
import UserService from '../../../services/apis/UserService';
import OfferService from '../../../services/apis/OfferService';
import OffersList from '../../offers/offersList';
// import NavToggle from "../../navToggle/navToggle";
import FixedHeader from '../../../common/fixedHeader/fixedHeader';


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
    userService;
    offerService;

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            offers: []
        }
        this.getAllOffersForUser = this.getAllOffersForUser.bind(this);
        this.userService = new UserService();
        this.offerService = new OfferService();
    }

    componentDidMount() {
        const { user } = this.props.location.state;
        this.setState({ user });
        this.getAllOffersForUser(user);
    }

    getAllOffersForUser(user) {
        if (user.Type === "Social Influencer") {
            this.userService.GetAllInfluencerUserOffers(user.Id).then(req => {
                this.setState({ offers: req });
            });
        }
        else { 
            this.offerService.getAllOffersByBusinessUserId(user.Id).then(req => {
                this.setState({ offers: req });
            });
        }

    }

    render() {
        const { classes } = this.props;
        const { offers, user } = this.state;
        return (
            <div>    
                {/* <NavToggle /> */}
                <FixedHeader />
                <OffersList offers={offers} fromBusiness={this.props.location.state.fromBusiness} fromAllOffers={true} user={user}/>
            </div>
        );
    }
}

AllOffers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllOffers);