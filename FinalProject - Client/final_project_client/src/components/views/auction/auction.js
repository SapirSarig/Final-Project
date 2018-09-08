import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FileUploader from '../../fileUploader/fileUploader';
import './auction.css';
import AuctionService from '../../../services/apis/AuctionService';

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

    constructor(props){
        super(props);

        this.state = {
            name: '',
            nameOfProduct: '',
            payment: '',
            description: '',
            numberFollowers: '',
            startDate: '',
            endtDate: ''
          };
        this.auctionService = new AuctionService();
        
        this.handleChange = (name, nameOfProduct, payment, description, numberFollowers, startDate, endtDate) => event => {
            this.setState({
                [name]: event.target.value,
                [nameOfProduct]: event.target.value,
                [payment]: event.target.value,
                [description]: event.target.value,
                [numberFollowers]:event.target.value,
                [startDate]: event.target.value,
                [endtDate]: event.target.value,
            });
        };
        this.AddAuction = this.AddAuction.bind(this);
    }

    AddAuction(){
        const {name} = this.state;
        let auction ={
            "name":name
        }
        this.auctionService.createAuction(auction).then(req => {
            console.log(req);
            
        });

    }

    render() {
        const { classes } = this.props;

        return (
            <div className="auctionWrapper">
                <form className={classes.container} noValidate autoComplete="off">
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
                            style = {{width: '18%'}}
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
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <div className="productWrapper">
                        <TextField
                            id="nameOfProduct"
                            label="Product"
                            className={classes.textField}
                            value={this.state.nameOfProduct}
                            onChange={this.handleChange('nameOfProduct')}
                            margin="normal"
                            style = {{width: '60%'}}
                        />
                        <FileUploader />
                    </div>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rowsMax="8"
                        onChange={this.handleChange('description')}
                        className={classes.textField + " descTextField"}
                        margin="normal"
                        style = {{width: '80%'}}
                    />
                    <div className="interestsContainer">
                        <div>Interests</div>
                        <div className="partOfInterests">
                            <div className="foodInterest interestWrapper">
                                <div className="checkboxforInterest">
                                    <input type="checkbox" value="1" id="checkboxFoodInput" name="" />
                                    <label for="checkboxFoodInput"></label>
                                </div>
                                <div className="descTitle">Food</div>
                            </div>
                            <div className="sportInterest interestWrapper">
                                <div className="checkboxforInterest">
                                    <input type="checkbox" value="2" id="checkboxFSportInput" name="" />
                                    <label for="checkboxFSportInput"></label>
                                </div>
                                <div className="descTitle">Sport</div>
                            </div>
                            <div className="clothesInterest interestWrapper">
                                <div className="checkboxforInterest">
                                    <input type="checkbox" value="3" id="checkboxClothesInput" name="" />
                                    <label for="checkboxClothesInput"></label>
                                </div>
                                <div className="descTitle">Clothes</div>
                            </div>
                            <div className="otherInterest interestWrapper">
                                <div className="descOfInterest">Other</div>
                                <input type="text" className="otherInput"/>
                            </div>
                        </div>
                    </div>
                    <TextField
                        id="numberFollowers"
                        label="Number of minimum followers"
                        value={this.state.numberFollowers}
                        onChange={this.handleChange('numberFollowers')}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        id="pament"
                        label="Payment"
                        className={classes.textField}
                        value={this.state.payment}
                        onChange={this.handleChange('payment')}
                        margin="normal"
                    />
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
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Auction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auction);