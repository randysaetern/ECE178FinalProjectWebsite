const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ddataSchema = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  devicename: { type: String, required: true },
  datasent: { type: String, required: true },
  sendlocation:{type: String, required: false}
  }, {
  timestamps: true,
});

const DData = mongoose.model('Data', ddataSchema);

module.exports = DData;