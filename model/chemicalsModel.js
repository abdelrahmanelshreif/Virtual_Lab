const mongoose = require('mongoose');

const chemicalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  taste: {
    type: String,
    required: true
  },
  smell: {
    type: String,
    required: true
  },
  molecularFormula: {
    type: String,
    required: true
  },
  atomicStructure: {
    type: String,
    required: true
  }
});

// Specify custom collection name
const Chemical = mongoose.model("Chemical", chemicalSchema, "Chemicals");

module.exports = Chemical;
