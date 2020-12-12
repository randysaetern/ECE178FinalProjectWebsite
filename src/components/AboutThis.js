import React, { Component } from 'react';
import '.././App.css';
import video1 from "./videos/video1.mp4"

export default class AboutThis extends Component{
    render() {
        return (
            <html>
            <head>
            <title>DE2-115 Embedded Systems over the Internet</title>
            </head>

            <body>
                <div class = "centered">
                    <h1>This Project is For ECE 178, Please Give us an A Dr. Raeisi.</h1>
                </div>
                <div>
                    <video width = "1000" height = "800" controls autoPlay unmuted>
                        <source src = {video1} type = "video/mp4"></source>
                    </video>
                </div>
                    <h2>Our Team</h2>
                <h3>The team for this specific project include Dr. Raeisi, Randy Saetern, and Koryale Brooks.</h3>
                <h3> Dr. Raeisi is the ECE 178 Professor for our Embedded Systems Course.</h3>
            </body>
            </html>
        )
      }
}