import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from "react-bootstrap/Button";

const DeviceData = props => (
  <tr>
    <td>{props.device.devicename}</td>
    <td>{props.device.datasent}</td>
    <td>{props.device.location}</td>
    <td>
      <Link to={"/edit/"+props.device._id}>edit</Link> | <Button onClick={() => { props.deleteDevice(props.device._id) }}>delete</Button>
    </td>
  </tr>
)

export default class DevicesList extends Component {
  constructor(props) {
    super(props);

    this.deleteDevice = this.deleteDevice.bind(this)

    this.state = {
      devices: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/devicedatas/')
      .then(response => {
        this.setState({ devices: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDevice(id) {
    axios.delete('http://localhost:5000/devices/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      devices: this.state.devices.filter(el => el._id !== id)
    })
  }
  deviceList() {
    return this.state.devices.map(currentdevice => {
      return <DeviceData device={currentdevice} deleteDevice={this.deleteDevice} key={currentdevice._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Devices</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>DeviceName</th>
              <th>Data Sent</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.deviceList() }
          </tbody>
        </table>
      </div>
    )
  }
}