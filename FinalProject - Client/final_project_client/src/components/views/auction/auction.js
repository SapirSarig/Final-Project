import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FileUploader from '../../fileUploader/fileUploader';
import './auction.css';
import AuctionService from '../../../services/apis/AuctionService';
import Interests from '../../../common/register/Interests';
import { Route, Redirect } from 'react-router';
import StringUtil from '../../../utils/StringUtil';
import auctionUtil from './auctionUtil';
import UserService from '../../../services/apis/UserService';
import { Link } from 'react-router-dom';

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

class Auction extends Component {
    auctionService;
    userService;

    constructor(props) {
        super(props);

        this.state = {
            auction: {
                UserId: '1', //take from props!
                Title: '',
                Product: '',
                Description: '',
                NumOfMinFollowers: '',
                StartDate: '',
                EndDate: '',
                Offers: [],
                Interests: [],
                Picture: ""
            },
            CompanyName: "",
            auctionOk: false,
            errors: {
                Title: "",
                Product: "",
                NumOfMinFollowers: "",
                StartDate: "",
                EndDate: ""
            }

        };
        this.auctionService = new AuctionService();
        this.userService = new UserService();
        this.handleChange = this.handleChange.bind(this);

        this.AddAuction = this.AddAuction.bind(this);
        this.convertDate = this.convertDate.bind(this);
        this.getCompanyName = this.getCompanyName.bind(this);
        this.isBusinessUser = this.isBusinessUser.bind(this);
        this.updateFileImage = this.updateFileImage.bind(this);
    }

    componentDidMount() {
        let { auction } = this.state;
        const { user } = this.props.location.state;
        const theAuction = (this.props.location && this.props.location.state.auction) || auction;
        auction.UserId = user.Id;
        this.getCompanyName(theAuction.UserId)
        this.setState({ auction });
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { auction } = this.state;

        if (name === "Interests") {
            let obj = {
                "Value": value
            };
            if (target.type === "checkbox") {
                if (target.checked) {

                    value && auction.Interests.push(obj);

                    this.setState({
                        auction
                    })
                }
                else {
                    const index = auction.Interests.findIndex((interest) => interest.value === value);
                    auction.Interests.splice(index, index + 1);
                }
            }
        }
        else {
            auction[name] = value;
            this.setState({
                auction
            });
        }

        this.checkValidation(name, value);
    }

    checkValidation(fieldName, value) {
        const { errors } = this.state;

        let errorMessage;
        if ((fieldName === "Title") || (fieldName === "Product") || (fieldName === "NumOfMinFollowers")) {
            if (StringUtil.isEmptyString(value)) {
                errorMessage = `${fieldName} is not valid`;
            }
        } else if ((fieldName === "StartDate") || (fieldName === "EndDate")) {
            errorMessage = auctionUtil.dateValidation(value);
        }

        errors[fieldName] = errorMessage;
        this.setState({
            errors
        });
    }


    AddAuction() {
        const { auction } = this.state;

        if (!this.isAllValid())
            return false;

        this.auctionService.createAuction(auction).then(req => {
            if (req) {
                if (req.Message) {
                    alert(req.Message);
                }
                else {
                    alert("Your auction was submitted succefully!");
                    this.setState({ auctionOk: true });
                }
            }
            else {
                alert("Server Error");
            }

        });

    }

    isAllValid() {
        const { auction } = this.state;
        let startDateErrorMessage = auctionUtil.dateValidation(auction.StartDate);
        let endDateErrorMessage = auctionUtil.dateValidation(auction.EndDate);
        let isValidInputs =
            !StringUtil.isEmptyString(auction.Title)
            && !StringUtil.isEmptyString(auction.Product)
            && !StringUtil.isEmptyString(auction.NumOfMinFollowers)
            && (startDateErrorMessage === undefined)
            && (endDateErrorMessage === undefined);

        return isValidInputs;
    }

    convertDate(date) {
        let resDate = "";

        resDate += date.substring(0, 4);
        resDate += "-"
        resDate += date.substring(5, 7);
        resDate += "-"
        resDate += date.substring(8, 10);

        return resDate;
    }

    getCompanyName(userId) {
        let res = "";

        this.userService.getUserById(userId)
            .then(req => {
                res = req.CompanyName;
                this.setState({ CompanyName: res });
            });
    }

    isBusinessUser() {
        const { user, location } = this.props;
        const theUser = (location && location.state.user) || user;
        console.log("theUser", theUser);
        console.log("theUser.Type", theUser.Type);
        console.log("bool:", (theUser.Type === "BusinessUser"));
        return (theUser.Type === "BusinessUser");
    }


    updateFileImage(src) {
        let{auction} = this.state;
        auction.Picture = src;
        this.setState({ auction})
    }


    render() {
        const { classes, isNew, location, user } = this.props;
        //const { UserId, Title, Product, Description, NumOfMinFollowers, StartDate, EndDate } = this.state;
        const { auction, auctionOk, errors, CompanyName } = this.state;
        const theAuction = (location && location.state.auction) || auction;
        const isAuctionNew = (location && location.state.isNew);
        const theUser = (location && location.state.user) || user;

        return (
            <div>
                {!auctionOk ?
                    <div className="auctionWrapper">
                        <div className={classes.container}>
                            <div className="firstLineWrapper">
                                {!isAuctionNew && <TextField
                                    id="read-only-input"
                                    name="AuctionNumber"
                                    label="Auction number"
                                    defaultValue={theAuction.Id}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ width: '18%' }}
                                />}
                                {/* {!isAuctionNew && this.isBusinessUser() && <div className="editAuctionBtn designBtn">
                                    Edit auction
                                </div>} */}
                            </div>
                            <div className="businessNameContainer">
                                <div className="businessWrapper">
                                    <label> {CompanyName} </label>
                                </div>
                            </div>
                            <TextField
                                id="name"
                                name="Title"
                                label="Auction title *"
                                defaultValue={isAuctionNew ? "" : theAuction.Title}
                                className={classes.textField + " titleTextField"}
                                // value={this.state.name}
                                // onChange={this.handleChange('name')}
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: Boolean(!isAuctionNew)
                                }}
                                margin="normal" />
                            <div className="productWrapper">
                                <TextField
                                    id="nameOfProduct"
                                    name="Product"
                                    label="Product *"
                                    className={classes.textField}
                                    defaultValue={isAuctionNew ? "" : theAuction.Product}
                                    //value={this.state.nameOfProduct}
                                    //onChange={this.handleChange('nameOfProduct')}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        readOnly: Boolean(!isAuctionNew)
                                    }}
                                    margin="normal"
                                    style={{ width: '60%' }}
                                />
                                <FileUploader updateFileImage={this.updateFileImage} imgSrc={theAuction.Picture} isAuctionNew={isAuctionNew}/>
                            </div>
                            <TextField
                                id="description"
                                name="Description"
                                label="Description *"
                                multiline
                                rowsMax="8"
                                defaultValue={isAuctionNew ? "" : theAuction.Description}
                                //onChange={this.handleChange('description')}
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: Boolean(!isAuctionNew)
                                }}
                                className={classes.textField + " descTextField"}
                                margin="normal"
                                style={{ width: '80%' }}
                            />
                            <TextField
                                id="numberFollowers"
                                name="NumOfMinFollowers"
                                label="Number of minimum followers*"
                                defaultValue={isAuctionNew ? "" : theAuction.NumOfMinFollowers}
                                //value={theAuction.NumOfMinFollowers}
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: Boolean(!isAuctionNew)
                                }}
                                type="number" min="0"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <span className="errorInput" > {errors["NumOfMinFollowers"] && errors["NumOfMinFollowers"]} </span>
                            <div className="dueDate">
                                <TextField
                                    id="startDate"
                                    name="StartDate"
                                    label="Start date*"
                                    type="date"
                                    className={classes.textField}
                                    defaultValue={isAuctionNew ? "" : this.convertDate(theAuction.StartDate)}
                                    //value={theAuction.StartDate}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        readOnly: Boolean(!isAuctionNew)
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <span className="errorInput"> {errors["StartDate"] && errors["StartDate"]} </span>
                                <TextField
                                    id="endDate"
                                    name="EndDate"
                                    label="End date*"
                                    type="date"
                                    className={classes.textField}
                                    defaultValue={isAuctionNew ? "" : this.convertDate(theAuction.EndDate)}
                                    //value={theAuction.EndDate}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        readOnly: Boolean(!isAuctionNew)
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <span className="errorInput" > {errors["EndDate"] && errors["EndDate"]} </span>
                            </div>
                            {/* <div className="submitAuctionBtn designBtn"> */}
                            <button hidden={!isAuctionNew} className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.AddAuction}>Submit</button>

                            {this.isBusinessUser() && (!isAuctionNew) && <Link className="designBtn" to={{ pathname: "/offersPerAuctionPage", state: { auction: theAuction, user: theUser } }}>
                                Show Offers
                            </Link>}
                            {!this.isBusinessUser() && <Link className="designBtn" to={{ pathname: "/starOffer", state: { auction: theAuction, user: theUser, fromBusiness: false } }}>
                                Add Offer
                            </Link>}
                            {/* </div> */}
                        </div>
                    </div>
                    :
                    <Redirect to={{
                        pathname: '/businessHomePage',
                        state: { user: this.props.location.state.user }
                    }} />}

                {/* // <div>
                    //     {this.context.router.push({ */}
                {/* //         pathname: '/BusinessHomePage',
                    //         state: { userInfo }
                    //     })}
                    // </div>}
            </div> */}
            </div>
        );
    }
}

Auction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auction);