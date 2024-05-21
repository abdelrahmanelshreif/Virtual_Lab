const mongoose = require('mongoose');

const toolsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
    // required: true
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photos'
  }
});
toolsSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'image',
    select: 'url'
  });
  next();
});

const Tools = mongoose.model('Tools', toolsSchema, 'Tools');

module.exports = Tools;
