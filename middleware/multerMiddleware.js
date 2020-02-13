
const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage });
// specific fields .fields([{name: 'single', maxCount: 1}, {name: 'multiple', maxCount: 3}]).fields([{name: 'single', maxCount: 1}, {name: 'multiple', maxCount: 3}])

module.exports = multerUploads;