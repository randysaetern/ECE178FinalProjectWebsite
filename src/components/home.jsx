import React from 'react';
import '.././App.css';

import Carousel from 'react-bootstrap/Carousel';
import Slide1 from "../images/Finalized Stuff.png";
import Slide2 from "../images/RandyProfile.png";
import Slide3 from "../images/KB.JPG";

//import Jumbotron from 'react-bootstrap/Jumbotron';
//import Button from 'react-bootstrap/Button';

function home(){
    return(
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block align-img"
                src={Slide1}
                alt="Meet the Team"
                />
                
                <h1 className = "color-black centeredtext">Meet the Team</h1>
                <h3 className = "color-black centeredtext">This is Our Team!</h3>
                
            </Carousel.Item>
            <Carousel.Item>
                
                <h1 className = "color-black background-blue centeredtext">Randy Saetern</h1>
                <h3 className = "color-black background-blue">Creator of this site. The Front-end, Back-end, Database, and Embedded Systems Engineer for this project.(Not Professional)(Still in skool)</h3>
                
                <img
                className="d-block w-400 align-img"
                src={Slide2}
                alt="Creater of This Site"
                />

                
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-50 align-img heightlimit"
                src={Slide3}
                alt="Cool Dude who Assisted this Project"
                />

                
                <h1 class = "color-black centeredtext">Koryale Brooks</h1>
                <h3 class = "color-black centeredtext">Koryale Brooks is an Undergraduate student in ECE 178 who assisted in the development of this project.</h3>
                
            </Carousel.Item>
        </Carousel>

    );
}
export default home;