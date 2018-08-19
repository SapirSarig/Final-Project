import React, { Component } from 'react';
import Interests from "./Interests";

class BusinessRegister extends Component {
    constructor(props) {
        super(props);
        this.handleImgChange = this.handleImgChange.bind(this);

        this.state = {
            CompanyName: "",
            src: require('../../images/AddAnImage.png'),
            LinkToCompanySite: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
    }

    componentDidMount() {
        this.updateChooseTypeState({});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.updateChooseTypeState(this.state));



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

    render() {
        const { src } = this.state;
        return (
            <div className="Container">
                <span>Company's Name:</span>
                <input type="text" name="CompanyName" onChange={this.handleInputChange} />
                <br />
                <span> Company's logo: </span>
                <img id="uploadPreview" src={src} className="logo" />
                <input type="file" name="myFile" onChange={this.handleImgChange} />

                <span>Link To Company's Site:</span>

                <input type="text" name="LinkToCompanySite" onChange={this.handleInputChange} />


            </div>
        )
    }
}

export default BusinessRegister;