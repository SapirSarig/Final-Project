import { InputAdornment, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 5,
    width: 300,
  },
  eye: {
    cursor: 'pointer',
  }});

class PasswordInput extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          passwordIsMasked: true,
        };
    }

    togglePasswordMask = () => {
      this.setState(prevState => ({
        passwordIsMasked: !prevState.passwordIsMasked,
      }));
    };

  render() {
    const { classes } = this.props;
    const { passwordIsMasked } = this.state;

    return(
      <TextField 
          type={passwordIsMasked ? "password" : "text"} 
          className={classes.textField}
          defaultValue={this.props.placeholder}
          style = {this.props.style}
          {...this.props} 
          InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <RemoveRedEye
                    className={classes.eye}
                    onClick={this.togglePasswordMask.bind(this)}
                  />
                </InputAdornment>
              ),
            }}
      />
    );
  }
}

PasswordInput.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
};

export default withStyles(styles)(PasswordInput);