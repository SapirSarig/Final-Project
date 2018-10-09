import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import './fileUploader.css';

class FileUploader extends Component {
    constructor(props){
        super(props);

        this.state = {
            active: false,
            imageSrc: '',
            loaded: false
        };

        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(e, file) {
        let fileName = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
            
        if (!fileName.type.match(pattern)) {
            alert('Invalid Format');
            return;
        }
        
        this.setState({ loaded: false });
        
        reader.onload = (e) => {
            this.setState({ 
                imageSrc: reader.result, 
                loaded: true 
            }); 
        }
        
        reader.readAsDataURL(fileName);
    }

    getFileObject() {
        return this.refs.input.files[0];
    }
    
    getFileString() {
        return this.state.imageSrc;
    }

    render(){
        let state = this.state,
        props = this.props,
        labelClass  = `uploader ${state.loaded && 'loaded'}`;

        return(
            <div className="editProdPicWrapper">
                <div className="productImgContainer">
                    <div className="imgContainer">
                        <img src={state.imageSrc} className={state.loaded ? 'loaded': undefined}/>
                    </div>
                </div>
                <input type="file" id="chooseFile" ref="fileUploader" accept="image/*" 
                    onChange={this.onFileChange} className="editPicInput" 
                    onClick={this.uploadHandler}/>
                <label for="chooseFile" className={labelClass}>Choose a file</label>
            </div>
        );
    }
}

export default FileUploader;