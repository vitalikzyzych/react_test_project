import React, {Component} from 'react';
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'


class UploadImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            data:null
        }
    }
    onDrop(files) {
        console.log('Received files: ', files);
        this.setState({files:files})
        console.log(this.state.files,"state File")
        



    }
    render() {

        return (
        <div>
            <Dropzone onDrop={this.onDrop.bind(this)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <div>
                <img src={this.state.files.map((file)=>{return file.preview})}/>
            </div>
        </div>
        );
    }
}

export default connect()(UploadImage)