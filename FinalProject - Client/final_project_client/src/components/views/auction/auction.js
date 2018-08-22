import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FileUploader from '../../fileUploader/fileUploader';
import './auction.css';

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
    constructor(props){
        super(props);

        this.state = {
            name: '',
            nameOfProduct: '',
            payment: ''
          };
        
        this.handleChange = (name, nameOfProduct, payment) => event => {
            this.setState({
                [name]: event.target.value,
                [nameOfProduct]: event.target.value,
                [payment]: event.target.value
            });
        };
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
                        id="multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="8"
                        onChange={this.handleChange('multiline')}
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
                        id="number"
                        label="Number of minimum followers"
                        value={this.state.age}
                        onChange={this.handleChange('age')}
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
                </form>
            </div>
        );
    }
}

Auction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auction);