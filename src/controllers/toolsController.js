const factory = require('../controllers/handlerFactory');
const Tool = require('../model/toolsModel');

exports.getAllTools = factory.getAll(Tool);
exports.getOneTools = factory.getOne(Tool);
exports.createNewTool = factory.createOne(Tool);
exports.updateTool = factory.updateOne(Tool);
exports.deleteTool = factory.deleteOne(Tool);
