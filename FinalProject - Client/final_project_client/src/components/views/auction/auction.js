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
            nameOfProduct: ''
          };
        
        this.handleChange = (name, nameOfProduct) => event => {
            this.setState({
                [name]: event.target.value,
                [nameOfProduct]: event.target.value
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
                </form>
            </div>
        );
    }
}

Auction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auction);