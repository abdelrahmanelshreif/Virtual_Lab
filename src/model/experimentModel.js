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
experimentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tools',
    select: 'name'
  }).populate({
    path: 'chemicals',
    select: 'name'
  });
  next();
});
experimentSchema.post('save', async function(doc, next) {
  await doc
    .populate({
      path: 'tools',
      select: 'name'
    })
    .populate({
      path: 'chemicals',
      select: 'name'
    })
    .execPopulate();

  next();
});

const Experiments = mongoose.model(
  'Experiments',
  experimentSchema,
  'Experiments'
);

module.exports = Experiments;
