const router = require('express').Router();
const { Mongoose } = require('mongoose');
let DData = require('../models/deviceData.model');

router.route('/').get((req, res) => {
  DData.find()
    .then(ddata => res.json(ddata))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const devicename = req.body.devicename;
  const datasent = req.body.datasent;
  const sendlocation = req.body.sendlocation;
  //const id = Mongoose.Schema.Types.ObjectID;
  const newData = new DData({
    id,
    devicename,
    datasent,
    sendlocation
  });

  newData.save()
  .then(() => res.json('Data added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/onlineData').get((req, res) => {
  DData.findOne({devicename:"onlineData"}).then(result =>{
    if (result){
      console.log("There is online Data available");
      res.json(result);
    }
    else{
      console.log("There is no online Data available and it will be created now.");
      //const id = new Mongoose.Types.ObjectId();
      const devicename = "onlineData";
      const datasent = "0";
      const sendlocation = "online";
      const newData = new DData({
       // _id: id,
        devicename:devicename,
        datasent:datasent,
        sendlocation:sendlocation
      });
      newData.save().then(result2 =>{
        console.log("success in creating online Data");
        res.json(result2)
      }).catch(err =>{
        console.log("UH OH NEW ONLINE DATA NOT CREATED!");
        res.status(0).json("nope");
      });
    }
  })
});
router.route('/de2').post((req, res) => {
  const devicename = req.body.devicename;
  const datasent = req.body.datasent;
  const sendlocation = req.body.sendlocation;
  console.log(datasent);

  DData.findOne({devicename:devicename}).then(result => {
    if(result){
      console.log("the Device is registered and logged already");
      DData.updateOne({_id:result._id},{datasent:datasent}).then(result2 =>{
        console.log("DE2 device data updated!");
        res.json({message:"Updated device data!"});
      }).catch(err => {
        console.log("UH OH SOMETHING WENT WRONG HERE!");
        res.status(500).json({message:"SHIET", err:err});
      });
    }
    else{
      //const id = new Mongoose.Types.ObjectId();
      const newData = new DData({
        devicename:devicename,
        datasent:datasent,
        sendlocation:sendlocation
      });
      newData.save().then(result2 =>{
        console.log("Device created and data is sent");
        res.json("Success in creation!");
      }).catch(err =>{
        console.log("UHOH SOMETHING WENT WRONG IN UPDATE");
        res.status(500).json({message:"SHIIIIET", err: err});
      });
    }
  })
});
router.route('/:id').get((req, res) => {
  DData.findById(req.params.id)
    .then(ddata => res.json(ddata))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  DData.findByIdAndDelete(req.params.id)
    .then(() => res.json('Data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  DData.findById(req.params.id)
    .then(ddata => {
      ddata.devicename = req.body.devicename;
      ddata.datasent = req.body.datasent;
      ddata.sendlocation = req.body.sendlocation;

      ddata.save()
        .then(() => res.json('Data updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;