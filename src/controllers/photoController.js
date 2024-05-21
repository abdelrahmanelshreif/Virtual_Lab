const multer = require('multer');
const path = require('path');
const Photo = require('../model/photosModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

const multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/uploads');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + extension);
  }
});
const multerFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject the file
  }
};
const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter
}).single('photo');

exports.createPhoto = catchAsync(async (req, res, next) => {
  uploadPhoto(req, res, async err => {
    if (err) {
      return next(new AppError('Error uploading file', 400));
    }
    if (!req.file) {
      return next(new AppError('No file was Uploaded', 400));
    }
    const newPhoto = new Photo();
    (newPhoto.path = path.join(__dirname, '..', 'uploads', req.file.filename)),
      (newPhoto.url = `https://virtual-lab-u65s.onrender.com/virtual_lab/api/v1/photo/${newPhoto._id}`),
      (newPhoto.width = req.body.width),
      (newPhoto.height = req.body.height);

    await newPhoto.save();
    res.status(201).json({
      status: 'success',
      data: {
        photo: newPhoto
      }
    });
  });
});
exports.accessPhoto = catchAsync(async (req, res, next) => {
  const photoId = req.params.id;
  const photo = await Photo.findById(photoId);
  if (!photo) {
    return next(new AppError('No Photo Found with this ID', 404));
  }
  res.sendFile(photo.path);
});
exports.deletePhoto = factory.deleteOne(Photo);
exports.getAllPhotos = factory.getAll(Photo);
