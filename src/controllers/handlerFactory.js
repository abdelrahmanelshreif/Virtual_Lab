const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    if (popOptions) query.populate(popOptions);
    const features = new APIFeatures(Model.findById(req.params.id), req.query)
      .filter()
      .sort()
      .fieldLimiting()
      .paginate();
    // const docs = await features.query.explain();
    const doc = await features.query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'deletion success',
      deletedObjectId: doc._id
    });
  });
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    let newDocData = req.body;
    const doc = await Model.findByIdAndUpdate(req.params.id, newDocData, {
      new: true,
      runValidators: true
    });
    if (!doc) {
      return next(new AppError('No document Found with that ID', 404));
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        data: doc
      }
    });
  });
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    let newDocData = req.body;
    const newDoc = await Model.create(newDocData);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc
      }
    });
  });
exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .fieldLimiting()
      .paginate();
    const docs = await features.query;
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs
      }
    });
  });
