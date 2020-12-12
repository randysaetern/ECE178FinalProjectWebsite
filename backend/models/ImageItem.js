const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageItemSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  imagename: {type: String, required: true},
  description: { type: String, required: false },
  productImageType: { type: String, required: false },
  productImage: {data: Buffer,  contentType: String }
}, {
  timestamps: true,
});

const ImageItem = mongoose.model('ImageItem', imageItemSchema);

module.exports = ImageItem;