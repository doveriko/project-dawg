const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

 
cloudinary.config({ 
    cloud_name: "doveriko", 
    api_key: "894655459995122", 
    api_secret: "JwsSufznjqpz9_OgRtQMm13E6wU"
  });

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'dawg',
  allowedFormats: ['jpg', 'png']
});
 
const parser = multer({ storage: storage });

module.exports = parser
