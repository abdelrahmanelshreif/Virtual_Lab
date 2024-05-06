const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const path = require('path');


// Configure Multer storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + extension);
  }
});

// Create Multer instance
const upload = multer({ storage });

exports.uploadPhoto = catchAsync(async(req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      // An error occurred during file upload
      return next(new AppError('Please Upload Photo Correctly',400));
    }

    if (!req.file) {
      // No file was uploaded
      return next(new AppError('No file uploaded',400));
    }
    res.json({ photoName: req.file.filename});
  });

});
exports.accessPhoto = catchAsync(async(req,res,next)=>{
  const filename = req.params.filename;
  if (!filename){
    return next(new AppError('No Photo Found',404));
  }
  const filePath = path.join(__dirname, '..','uploads', filename);

  res.sendFile(filePath);
})