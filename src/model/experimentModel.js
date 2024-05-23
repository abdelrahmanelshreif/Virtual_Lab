const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  info: {
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    observation: {
      type: String,
      default: ''
    },
    conclusion: {
      type: String,
      default: ''
    },
    equation: {
      type: String,
      default: ''
    },
    objective: {
      type: String,
      default: ''
    }
  },
  apparatus: [
    {
      type: String
    }
  ],
  images: 
    {
      device: {
        image: String,
        imageID: String,
        dimensions: {
          width: String,
          height: String
        }
      },
      tools: {
        order: Number,
        image: String,
        positions: {
          x: String,
          y: String
        },
        dimensions: {  // Added colon here
          width: String,
          height: String
        }
      }
    }
  ,
  tools: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tools'
    }
  ],
  steps: [
    {
      verb: {
        type: String
        // default: ''
      },
      description: {
        tool1: {
          id: mongoose.Schema.Types.ObjectId,
          title: {
            type: String
            //  default: ''
          }
        },
        tool2: {
          id: mongoose.Schema.Types.ObjectId,
          title: {
            type: String
            // default: ''
          }
        },
        quantity: {
          value: String
        },
        chemical: {
          id: mongoose.Schema.Types.ObjectId,
          title: {
            type: String
            // default: ''
          }
        },
        temperature: {
          value: String,
          title: {
            type: String
            //  default: ''
          }
        }
      }
    }
  ],
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
