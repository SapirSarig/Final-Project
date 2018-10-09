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
                Interests: []
            },
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

        this.handleChange = this.handleChange.bind(this);

        this.AddAuction = this.AddAuction.bind(this);
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
        console.log(this.state);
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
        this.auctionService.createAuction(auction).then(req => {
            console.log(req);
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

    render() {
        const { classes } = this.props;
        //const { UserId, Title, Product, Description, NumOfMinFollowers, StartDate, EndDate } = this.state;
        const { auction, auctionOk, errors } = this.state;

        return (
            <div>
                {!auctionOk ?
                    <div className="auctionWrapper">
                        <div className={classes.container}>
                            <div className="firstLineWrapper">
                                <TextField
                                    id="read-only-input"
                                    label="Auction number"
                                    defaultValue="1000"
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ width: '18%' }}
                                />
                                <div className="editAuctionBtn designBtn">
                                    Edit auction
                                </div>
                            </div>
                            <div className="businessNameContainer">
                                <div className="businessWrapper">
                                    Name of the business
                        </div>
                            </div>
                            <TextField
                                id="name"
                                label="Auction title"
                                className={classes.textField + " titleTextField"}
                                value={this.state.name}
                                onChange={this.handleChange}
                                margin="normal" />
                            <div className="productWrapper">
                                <TextField
                                    id="nameOfProduct"
                                    label="Product"
                                    className={classes.textField}
                                    value={this.state.nameOfProduct}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    style={{ width: '60%' }}
                                />
                                <FileUploader />
                            </div>
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                rowsMax="8"
                                onChange={this.handleChange}
                                className={classes.textField + " descTextField"}
                                margin="normal"
                                style={{ width: '80%' }}
                            />
                            <Interests handleInputChange={this.handleChange} />
                            <TextField
                                id="numberFollowers"
                                name="NumOfMinFollowers"
                                label="Number of minimum followers*"
                                value={auction.NumOfMinFollowers}
                                onChange={this.handleChange}
                                type="number"
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
                                    value={auction.StartDate}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <span className="errorInput" > {errors["StartDate"] && errors["StartDate"]} </span>
                                <TextField
                                    id="endDate"
                                    name="EndDate"
                                    label="End date*"
                                    type="date"
                                    className={classes.textField}
                                    value={auction.EndDate}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <span className="errorInput" > {errors["EndDate"] && errors["EndDate"]} </span>
                            </div>
                            {/* <div className="submitAuctionBtn designBtn"> */}
                            <button className={`${this.isAllValid() ? "" : "disableElement"}`} onClick={this.AddAuction}>Submit</button>
                            {/* </div> */}
                        </div>
                    </div>
                    :
                    <Redirect to={{
                        pathname: '/BusinessHomePage'
                        // state: { userInfo }
                    }} />}


                {/* <TextField
                                id="numberFollowers"
                                label="Number of minimum followers"
                                value={this.state.numberFollowers}
                                onChange={this.handleChange('numberFollowers')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal" />
                            <TextField
                                id="pament"
                                label="Payment"
                                className={classes.textField}
                                value={this.state.payment}
                                onChange={this.handleChange('payment')}
                                margin="normal" />
                            <div className="dueDate">
                                <TextField
                                    id="startDate"
                                    label="Start date"
                                    type="date"
                                    className={classes.textField}
                                    value={this.state.startDate}
                                    onChange={this.handleChange('startDate')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="endDate"
                                    label="End date"
                                    type="date"
                                    className={classes.textField}
                                    value={this.state.endtDate}
                                    onChange={this.handleChange('endtDate')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="submitContainer">
                                <div className="submitAuctionBtn designBtn">
                                    Submit auction
                        </div> */}
            </div>
        );
    }
}

Auction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auction);