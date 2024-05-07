const factory = require('../controllers/handlerFactory');
const Chemicals = require('../model/chemicalsModel');

exports.getAllChemicals = factory.getAll(Chemicals);
exports.createNewChemical = factory.createOne(Chemicals);
exports.updateChemical = factory.updateOne(Chemicals);
exports.deleteChemical = factory.deleteOne(Chemicals);
exports.uploadChemicalPhoto = factory.uploadPhotos('atomicStructure', 1);
