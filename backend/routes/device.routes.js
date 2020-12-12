const router = require('express').Router();
let Device = require('../models/device.model');

router.route('/').get((req, res) => {
  Device.find()
    .then(device => res.json(device))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const devicename = req.body.devicename;

  const newDevice = new Device({devicename});

  newDevice.save()
    .then(() => res.json('Device added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Device.findById(req.params.id)
    .then(device => res.json(device))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Device.findByIdAndDelete(req.params.id)
    .then(() => res.json('Device deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Device.findById(req.params.id)
    .then(device => {
      device.devicename = req.body.devicename;

      device.save()
        .then(() => res.json('Device updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;