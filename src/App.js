import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/ultilities/setAuthenicatedToken";
import { setCurrentUser, logoutUser } from "./components/actions/authActions";
import './App.css';
import { Provider } from "react-redux";
import store from "./components/store/store";
import Register from "./components/register/register"; 
import PrivateRoute from "./privateRoutes/privateRoute";


import Nav from "./components/nav";
//import SignUp from "./components/signup.component";
import home from './components/home'
import AboutThis from './components/AboutThis.js';
import HIW from './components/howitworks.component';
import SignUp from './components/signup.component';
import DevicesList from './components/DeviceData';
import landingPage from "./landingPage/landingPage"
import Login from "./components/login/login";
import ImageUpload from "./components/ImageUpload";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decodedToken = jwt_decode(token);
  store.dispatch(setCurrentUser(decodedToken));
  const exoirationTime = Date.now() / 1000; 
  
  if (decodedToken.exp < exoirationTime) {
    store.dispatch(logoutUser());         // Logout user and redirect them to the login screen. 
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Nav />
          <br/>
          <Route path ="/" exact component = {home} />
          <Route path ="/home" exact component = {home} />
          <Route path = "/aboutthis" exact component = {AboutThis} />
          <Route path = "/howitworks" exact component = {HIW}/>
          <Route path="/register" exact component={Register} />
          <Route path = "/registerdevice" exact component = {SignUp}/>
          <Route path = "/dataDevices" exact component = {DevicesList} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path = "/tstupload" exact component = {ImageUpload} />
          <Switch>
                <PrivateRoute exact path="/landingPage" component={landingPage} />      
          </Switch>
      </Router>
    </Provider>
  );
}
export default App;


/* To be Implemented 

<Route path = "/DevicesData" exact component = {} />

*/