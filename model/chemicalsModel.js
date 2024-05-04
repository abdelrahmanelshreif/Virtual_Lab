const mongoose = require('mongoose');


const chemicalSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true },
  state: { 
     type: String, 
     required: true },
  color: { 
     type: String, 
     required: true },
  taste: { 
    type: String,
     required: true },
  smell: {
     type: String, 
     required: true },
  molecularFormula: {
     type: String,
    required: true },
  atomicStructure: {
     type: String,
     required: true }
});

const Chemicals = mongoose.model("Chemicals", chemicalSchema);

module.exports = Chemicals;