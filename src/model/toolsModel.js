const mongoose = require('mongoose');

const toolsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    // required: true
  },
  image: {
    type: String,
    // required: true
  }
});

const Tools = mongoose.model('Tools', toolsSchema, 'Tools');

module.exports = Tools;
