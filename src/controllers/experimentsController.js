const factory = require('./handlerFactory');
const Experiment = require('../model/experimentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tools = require('../model/toolsModel');
const Chemicals = require('../model/chemicalsModel');

async function getToolIDs(Model, Names) {
  const IDs = [];
  if (typeof Names === 'string') {
    let arr = [];
    arr.push(Names);
    Names = arr;
  }
  for (const Name of Names) {
    const foundItem = await Model.findOne({ name: Name }); // Find the tool by name
    if (foundItem) {
      IDs.push(foundItem._id); // Push the ID of the found tool to the toolIDs array
    } else {
      throw new AppError(
        `Item with name '${Name}' not found! Please check if it exists`,
        400
      );
    }
  }
  return IDs;
}
exports.getAllExperiments = factory.getAll(Experiment);
exports.updateExperiment = factory.updateOne(Experiment);
exports.deleteExperiment = factory.deleteOne(Experiment);
exports.uploadExperimentPhoto = factory.uploadPhotos('apparatus', 10)
;
exports.createNewExperiment = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    objective,
    equation,
    observation,
    conclusion,
    //steps,
    tools,
    chemicals
  } = req.body;
  const toolIDs = await getToolIDs(Tools, tools);
  const chemicalIDs = await getToolIDs(Chemicals, chemicals);
  const apparatus = req.files.map(file => file.path);
  const newExperiment = await Experiment.create({
    name,
    description,
    objective,
    equation,
    observation,
    conclusion,
    //steps,
    apparatus,
    tools: toolIDs,
    chemicals: chemicalIDs
  });
  res.status(201).json({
    status: 'success',
    data: {
      newExperiment
    }
  });
});
