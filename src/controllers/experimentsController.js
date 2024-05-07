const factory = require('./handlerFactory');
const Experiment = require('../model/experimentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tools = require('../model/toolsModel');
const Chemicals = require('../model/chemicalsModel');

const getToolIDs = async function(Model, Names) {
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
};

exports.getAllExperiments = factory.getAll(Experiment);
exports.deleteExperiment = factory.deleteOne(Experiment);
exports.uploadExperimentPhoto = factory.uploadPhotos('apparatus', 10);
exports.createNewExperiment = catchAsync(async (req, res, next) => {
  let data = req.body;
  const toolIDs = await getToolIDs(Tools, data.tools);
  data['tools'] = toolIDs;
  const chemicalIDs = await getToolIDs(Chemicals, data.chemicals);
  data['chemicals'] = chemicalIDs;
  const apparatus = req.files.map(file => file.filename);
  data['apparatus'] = apparatus;
  console.log(data);
  const newExperiment = await Experiment.create(data);
  res.status(201).json({
    status: 'success',
    data: {
      newExperiment
    }
  });
});
exports.updateExperiment = catchAsync(async (req, res, next) => {
  const newData = req.body;
  let toolIDs, chemicalIDs, apparatus;
  if (req.body.tools) {
    toolIDs = await getToolIDs(Tools, req.body.tools);
    newData['tools'] = toolIDs;
  }
  if (req.body.chemicals) {
    chemicalIDs = await getToolIDs(Chemicals, req.body.chemicals);
    newData['chemicals'] = chemicalIDs;
  }
  if (req.files) {
    apparatus = req.files.map(file => file.filename);
    newData['apparatus'] = apparatus;
  }
  const newExperiment = await Experiment.findByIdAndUpdate(
    req.params.id,
    newData,
    {
      new: true,
      runValidators: true
    }
  );
  res.status(201).json({
    status: 'success',
    data: {
      newExperiment
    }
  });
});
