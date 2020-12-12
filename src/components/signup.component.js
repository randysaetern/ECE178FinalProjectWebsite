import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from 'react-bootstrap/Button'

import '../App.css'

export default class SignUp  extends Component{
    
    constructor(props){
        super(props);

        this.onChangeDevicename = this.onChangeDevicename.bind(this);

  
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            devicename:''
        }
    }
    
    onChangeDevicename(e){
        this.setState({
        devicename: e.target.value
        })
      }

    onSubmit(e){
        e.preventDefault();

        const user = {
            devicename: this.state.devicename,
        }

        console.log(user);

        axios.post('http://localhost:5000/devices/add',user)
            .then(res => console.log(res.data));
        this.setState({
            devicename: ''
        })
        //window.location = '/usercreated';
    }

    render() {
        return (
            <Form onSubmit = {this.onSubmit} className="sign-up-form">
            <h1>
              <span className="font-weight-bold"> WSN Register Device</span> 
            </h1>
            <h2 className = "text-center"> Signup: Device </h2>
            <FormGroup>
              <Label>Username </Label>
              <Input type = "devicename" placeholder = "Choose a device name" onChange = {this.onChangeDevicename} />
            </FormGroup>
            <Button className="btn-block" variant="outline-success" type = "submit"> {'Register Device'} </Button> 
          </Form>
        )
      }
}
