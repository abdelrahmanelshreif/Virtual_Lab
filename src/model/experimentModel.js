const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  info:{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    observation: {
      type: String
    },
    conclusion: {
      type: String
    },
    equation: {
      type: String
    },
    objective: {
      type: String
    },
  },
  apparatus: [
    {
      type: String,
      required: true
    }
  ],
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
