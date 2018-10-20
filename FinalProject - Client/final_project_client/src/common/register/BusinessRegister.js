import React, { Component } from 'react';
import RegisterService from '../../services/register/RegisterService';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import FileUploader from '../../components/fileUploader/fileUploader';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});

class BusinessRegister extends Component {
    constructor(props) {
        super(props);
        this.handleImgChange = this.handleImgChange.bind(this);

        this.state = {
            CompanyName: "",
            src: "",
            WebsiteLink: "",
            errors: { WebsiteLink: undefined }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.updateFileImage = this.updateFileImage.bind(this);

    }

    componentDidMount() {
        this.updateChooseTypeState({});
        const { userInfo} = this.props;
        if(Object.getOwnPropertyNames(userInfo).length > 0){
            this.setState({
                CompanyName: userInfo.CompanyName,
                WebsiteLink: userInfo.WebsiteLink
            })
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.updateChooseTypeState(this.state));
        this.checkValidation(name, value);
    }
    
    checkValidation(name, value) {
        const { errors, LinksToProfiles } = this.state;
        let errorMessage;
        if (name === "WebsiteLink") {
            errorMessage = RegisterService.linkValidation(value);
        }

        errors[name] = errorMessage;
        this.setState({
            errors
        });
    }

    handleImgChange(e) {
        let files = e.target.files;
        if (files && files[0]) {
            var reader = new FileReader();

            reader.onload = (r) => {
                this.setState({
                    src: r.target.result
                }, () => this.updateChooseTypeState(this.state));

            }

            reader.readAsDataURL(files[0]);
        }
    }

    updateChooseTypeState(state) {
        const { updateChooseTypeStateObject } = this.props;
        if (true) {// validation 
            updateChooseTypeStateObject(state);
        }
    }

    updateFileImage(src) {
        this.setState({ src },() => this.updateChooseTypeState(this.state));
        console.log("STATE!!", this.state);
    }

    render() {
        const { src, errors, CompanyName, WebsiteLink } = this.state;
        const {  classes,userInfo } = this.props;
        return (
            <div className="businessContainer">
                <TextField
                    id="companyName"
                    label="Company's Name *"
                    className={classes.textField}
                    value={CompanyName} 
                    name="CompanyName"
                    onChange={this.handleInputChange}
                    margin="normal"
                />

                {/* <input type="text" name="CompanyName" onChange={this.handleInputChange} /> */}

                <div className="imgWrapper businessImgWrapper">
                    <span> Company's logo: </span>
                    <FileUploader updateFileImage={this.updateFileImage} imgSrc={userInfo.Picture}/>
                </div>
                {/* src={Object.getOwnPropertyNames(userInfo).length > 0? userInfo.Picture : src} 
                <span> Company's logo </span>
                <img id="uploadPreview" src={src} className="logo" />
                <input type="file" name="myFile" onChange={this.handleImgChange} /> */}

                <TextField
                    id="companyLink"
                    label="Link To Company's Site"
                    className={classes.textField}
                    value={WebsiteLink} name="WebsiteLink"
                    onChange={this.handleInputChange}
                    margin="normal"
                />
                {/* <span>Link To Company's Site</span>
                <input type="text" name="WebsiteLink" onChange={this.handleInputChange} /> */}
                <span className="errorInput">{errors["WebsiteLink"] && errors["WebsiteLink"]}</span>


            </div>
        )
    }
}

BusinessRegister.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessRegister);