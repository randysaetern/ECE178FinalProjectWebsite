const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  devicename: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;