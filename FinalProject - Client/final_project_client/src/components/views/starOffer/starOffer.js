import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
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
    constructor(props){
        super(props);

        this.state = {
            name: '',
            nameOfProduct: '',
            payment: '',
            offerAdvertising: '',
            offerDescription: ''
          };
        
        this.handleChange = (name, nameOfProduct, payment, offerAdvertising, offerDescription) => event => {
            this.setState({
                [name]: event.target.value,
                [nameOfProduct]: event.target.value,
                [payment]: event.target.value,
                [offerAdvertising]: event.target.value,
                [offerDescription]: event.target.value,
            });
        };
    }

    render() {
        const { classes } = this.props;

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
                            style = {{width: '30%'}}
                        />
                        <div className="editAuctionBtn designBtn">
                            Edit offer
                        </div>
                    </div>
                    <TextField
                        id="read-only-input"
                        label="Auction name"
                        defaultValue="Tal's Auction"
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        style = {{width: '30%'}}
                    />
                    <TextField
                        id="read-only-input"
                        label="Star's name"
                        defaultValue="Tal"
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        style = {{width: '30%'}}
                    />
                    <div className="separatorLine"></div>
                    <TextField
                        id="offerAdvertising"
                        label="Offer advertising"
                        multiline
                        rowsMax="8"
                        value={this.state.offerAdvertising}
                        onChange={this.handleChange('offerAdvertising')}
                        className={classes.textField}
                        margin="normal"
                        style = {{width: '80%'}}
                    />
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
                    {/* <div className="socialMediaContainer">
                        <div className="socialMediaTitle">Social Media</div>
                        <div className="socialMediaIcons">
                            <div className="facebook socialMediatWrapper">
                                <div className="checkboxforSocialMedia">
                                    <input type="checkbox" value="1" id="checkboxfacebookInput" name="" />
                                    <label for="checkboxfacebookInput"></label>
                                </div>
                                <div className="descTitleForSocialMedia">
                                    <i className="fab fa-facebook-square" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="instagram socialMediatWrapper">
                                <div className="checkboxforSocialMedia">
                                    <input type="checkbox" value="2" id="checkboxFInstagramInput" name="" />
                                    <label for="checkboxFInstagramInput"></label>
                                </div>
                                <div className="descTitleForSocialMedia">
                                    <i class="fab fa-instagram" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="twitter socialMediatWrapper">
                                <div className="checkboxforSocialMedia">
                                    <input type="checkbox" value="3" id="checkboxTwitterInput" name="" />
                                    <label for="checkboxTwitterInput"></label>
                                </div>
                                <div className="descTitleForSocialMedia">
                                    <i class="fab fa-twitter-square" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="youtube socialMediatWrapper">
                                <div className="checkboxforSocialMedia">
                                    <input type="checkbox" value="4" id="checkboxYoutubeInput" name="" />
                                    <label for="checkboxYoutubeInput"></label>
                                </div>
                                <div className="descTitleForSocialMedia">
                                    <i class="fab fa-youtube-square" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <TextField
                        id="offerDescription"
                        label="Offer's Description"
                        multiline
                        rowsMax="8"
                        value={this.state.offerDescription}
                        onChange={this.handleChange('offerDescription')}
                        className={classes.textField}
                        margin="normal"
                        style = {{width: '80%'}}
                    />
                    <div className="btnContainer">
                        <div className="send designBtn">
                            Send Offer 
                        </div>
                        <div className="send designBtn">
                            Open negotiaition 
                        </div>
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