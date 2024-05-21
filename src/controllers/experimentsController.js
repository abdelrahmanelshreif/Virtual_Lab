const factory = require('./handlerFactory');
const Experiment = require('../model/experimentModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllExperiments = factory.getAll(Experiment);
exports.deleteExperiment = factory.deleteOne(Experiment);
exports.getOneExperiment = factory.getOne(Experiment);
exports.uploadExperimentPhoto = factory.uploadPhotos('apparatus', 10);
exports.createNewExperiment = catchAsync(async (req, res, next) => {
  let data = req.body;
  let apparatus;
  if (req.files && req.files.length) {
    apparatus = req.files.map(file => file.filename);
    data['apparatus'] = apparatus;
  }
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
  let apparatus;
  if (req.files && req.files.length) {
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
