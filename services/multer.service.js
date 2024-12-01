const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const path = require('path');
const allowedFileTypes = ['.jpg', '.png', '.gif', 'pdf'];
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName;

    switch (file.fieldname) {
      case 'uploadBill' :
        folderName = 'expenseBill';
        break;
      case 'profile_image':
        folderName = 'profileImages';
        break;
      case 'aadharImage_front':
      case 'aadharImage_back':
        folderName = 'aadharImages';
        break;
      case 'addressProofImage':
        folderName = 'addressProofImages';
        break;
      case 'rentalAgreementImage':
        folderName = 'rentalAgreementImages';
        break;
      default:
        folderName = 'others';
    }

    return {
      folder: folderName,
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`,
      resource_type: 'image',
    };
  }
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error(responseModel.validationError('Invalid Image Type')));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;
