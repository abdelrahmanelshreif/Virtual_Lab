const mongoose = require('mongoose');

const photosSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  }
});

const Photos = mongoose.model('Photos', photosSchema, 'Photos');

module.exports = Photos;
