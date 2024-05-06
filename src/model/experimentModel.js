const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  objective: {
    type: String
  },
  equation: {
    type: String
  },
  apparatus: [
    {
      type: String,
      required: true
    }
  ],
  observation: {
    type: String
  },
  conclusion: {
    type: String
  },
  tools: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tools'
    }
  ],
  steps: [[String]],
  chemicals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chemicals'
    }
  ]
});

const Experiments = mongoose.model(
  'Experiments',
  experimentSchema,
  'Experiments'
);

module.exports = Experiments;