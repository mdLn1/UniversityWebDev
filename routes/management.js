const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const writeFeedback = require("../utils/writeFeedback");
const CustomError = require("../utils/CustomError");
const IsInRole = require("../middleware/authorize");
const {
    getUserDetails,
    updateUserDetails
  } = require("../db/queries/users");

//@route POST api/management/:id/update-user
//@desc Change user details
//@access Private and limited access
router.post(
	'/:id/update-user',
	[auth, IsInRole(['Admin', 'Manager'])],
	async (req, res, next) => {
		try {
            const user = await getUserDetails(req.params.id);
			const { name, email, role_id, department_id } = req.body;
            await updateUserDetails(name, email, role_id, department_id, user.email);
            res.status(200).json({user: {name, email, role_id, department_id}});
		} catch (err) {
			next(err);
		}
	}
);