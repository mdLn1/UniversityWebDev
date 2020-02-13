const { config } = require('cloudinary');
const dotenv= require('dotenv');
const configPackage = require('config');
dotenv.config();
const cloudinaryConfig = (req, res, next) => {
	
	config({
		cloud_name: configPackage.get('cloud_name'),
		api_key: configPackage.get('api_key'),
        api_secret: configPackage.get('api_secret')
	});
	next();
};
module.exports = cloudinaryConfig;