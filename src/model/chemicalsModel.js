const mongoose = require('mongoose');

const chemicalsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    // required: true
  },
  color: {
    type: String,
    // required: true
  },
  taste: {
    type: String,
    // required: true
  },
  smell: {
    type: String,
    // required: true
  },
  molecularFormula: {
    type: String,
    // required: true
  },
  atomicStructure: {
    type: String,
    // required: true
  }
});

// Specify custom collection name
const Chemicals = mongoose.model('Chemicals', chemicalsSchema, 'Chemicals');

module.exports = Chemicals;
