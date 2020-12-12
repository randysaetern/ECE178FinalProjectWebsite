const express = require('express');
require('express-async-errors')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const passport = require('passport')
const morgan = require("morgan"); 
const paypal = require("paypal-rest-sdk"); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/images', express.static('uploads'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
const users = require("./routes/users");
app.use(passport.initialize());
require('./config/passport');
app.use('/routes/users', users);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//const exercisesRouter = require('./routes/exercises');
const devicesRouter = require('./routes/device.routes');
const deviceDataRouter = require('./routes/devicedata.routes')
const imageitemRouter = require('./routes/imageitem');
//app.use('/exercises', exercisesRouter);
app.use('/devices', devicesRouter);
app.use('/devicedatas',deviceDataRouter);
app.use('/imageitems',imageitemRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});