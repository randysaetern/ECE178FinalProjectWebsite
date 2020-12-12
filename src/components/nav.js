import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";



class navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "", 
      errors: {},
      search: ""
    };
  }
  static propTypes = { 
    auth: PropTypes.object.isRequired
  }
  componentDidMount() { 
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth; 
      this.setState({role: user.role}); 
    }
    else{
      this.setState({role:"guest"});
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth; 
    const userLink = ( // user roles
      <Fragment>
         <Nav className="ml-auto">
          <Nav.Link href="http://localhost:3000/tstupload" hidden = {this.state.role === "nothing"}>Add an image</Nav.Link>
          <Nav.Link href="http://localhost:3000/viewyouruploads" hidden = {this.state.role === "student"}>View Your Uploads</Nav.Link>
          <Nav.Link href="http://localhost:3000/landingPage">Profile</Nav.Link>      
        </Nav>
     </Fragment>
    )
    
    const guestLink = ( //guest roles 
      <Fragment>
         <Nav className="ml-auto">
          <Nav.Link href="http://localhost:3000/register">Register</Nav.Link>
          <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
          </Nav>
      </Fragment>
    )
    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="http://localhost:3000/home">ECE 178 Embedded System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="http://localhost:3000/aboutthis">About this Project and Us</Nav.Link>
            <Nav.Link href="http://localhost:3000/howitworks">How It Works</Nav.Link>
            <Nav.Link href="http://localhost:3000/dataDevices">Devices Data Logging</Nav.Link>
          </Nav>
          {isAuthenticated ? userLink:guestLink}
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors, 
  role: state.role
});
export default connect(mapStateToProps)(navbar);