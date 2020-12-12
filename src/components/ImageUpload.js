import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import '../App.css'

class ImageUpload extends Component{
    constructor(props){
        super(props);

        //this.onChangeUsername = this.onChangeUsername.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username : "",
            imagename:"",
            description: "",
            productImage: "", // location
            imageData: ""
        }
    }

    componentDidMount(){ 
      const {user} = this.props.auth;
      this.setState({username: user.name});
    }
    /*
    onChangeUsername(e){
        this.setState({
        username: e.target.value
        })
    }
    */
    onChangeDescription(e){
      this.setState({
      description: e.target.value
      })
    }
    fileSelectedHandler(e) {
        this.setState({
            productImage: e.target.files[0]
        });
        this.previewFile(e.target.files[0]);
    }
    onChange = e => {
      this.setState({[e.target.id]: e.target.value})
    }

    previewFile = (file) =>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        this.setState({imageData: reader.result});
      };
      
    }
    // this is for local uploads. (e.g. randy's phone)
    fileUploadHandler = (e) =>{
      e.preventDefault();
      const newImageItem = new FormData();
      //newImageItem.append("_id",Mongoose.Types.ObjectId);
      newImageItem.append("username",this.state.username);
      newImageItem.append("imagename",this.state.imagename);
      newImageItem.append("productImage",this.state.productImage,this.state.productImage.name);
      newImageItem.append("description",this.state.description);
      console.log(newImageItem);
      axios.post('http://10.0.0.253:5000/imageitems/add', newImageItem).then(res => {
          console.log(res.data)});
        
    }
    onSubmit(e){
      e.preventDefault();
      const newImageItem = new FormData();
      //newImageItem.append("_id",Mongoose.Types.ObjectId);
      newImageItem.append("username",this.state.username);
      newImageItem.append("imagename",this.state.imagename);
      newImageItem.append("productImage",this.state.productImage,this.state.productImage.name);
      newImageItem.append("description",this.state.description);
      console.log(newImageItem);
      axios.post('http://10.0.0.253:5000/imageitems/add', newImageItem).then(res => {
          console.log(res.data)});
    }
    
    render() {
     // const { user } = this.props.auth;
        return (
            /*
            <div>
                <input type = "file" onChange = {this.fileSelectedHandler}/>
                <button onClick={this.fileUploadHandler}>Upload Handle</button>
            </div>*/
            <Form className="imgupload">
            <h2 className="text center">
               Fill in the form to add an 
            </h2>
              <h3>
              User Name:  {this.state.username.split(" ")[0]}
              </h3>
              <FormGroup>
              <Label>Image Name </Label>
              <Input type = "Description" placeholder = "Name of Image?" value = {this.state.imagename} id = "imagename" onChange = {this.onChange}/>
            </FormGroup>
            <FormGroup>
              <Label>Description </Label>
              <Input type = "Description" placeholder = "What is this Image?" onChange = {this.onChangeDescription}/>
            </FormGroup>
            <FormGroup>
              <Label>File </Label>
              <Input type = "file" className="form-control-file" onChange = {this.fileSelectedHandler}/>
            </FormGroup>   
            <Button type = "upload" className="btn-block" variant="outline-success" onClick = {this.onSubmit}> {'Upload'} </Button> 
            <div>

              {this.state.imageData && (<img src= {this.state.imageData} alt = "chosen" style = {{height:'300px'}} />)}
            </div>
          
          </Form>
            
        )
      }
}
ImageUpload.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps)(ImageUpload);