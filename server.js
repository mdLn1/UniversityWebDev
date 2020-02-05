const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const writeFeedback = require("./utils/writeFeedback");
// const cors = require("cors");

// var allowedOrigins = ['https://localhost:3000', 'https://localhost:5000', 'http://localhost:5000', 'http://localhost:3000', 'https://medev.co.uk', 'https://www.medev.co.uk'];
// var corsOptions = {origin: function(origin, callback) {
// 	console.log(origin);
// 	if (!origin) return callback(null, true);
// 	if (allowedOrigins.indexOf(origin) === -1) {
// 		var msg =
// 			'The CORS policy for this site does not ' +
// 			'allow access from the specified Origin.';
// 		return callback(new Error(msg), false);
// 	}
// 	return callback(null, true);
// }
// }
// app.use(cors(corsOptions));

// Initialise middleware
app.use(express.json({ extended: false }));

// WARNING! Errors may show if the routes files don't have module.exports = router;
app.use('/api/user', require('./routes/user.js'));
app.use('/api/auth', require('./routes/authRoute.js'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/ideas', require('./routes/ideas'));
app.use('/api/departments', require('./routes/departments'))

// Handling pages not found
app.use((req, res, next) => {
	res.status(404).send({ feedback: writeFeedback('Resource not found') });
});

// Global error handling through middleware
app.use((err, req, res, next) => {
	console.log(err);
	if (err.statusCode) {
		return res.status(err.statusCode).json(writeFeedback(err.message));
	}
	res.status(500).json(writeFeedback(err.message));
});


app.listen(PORT, () => console.log("API is listening on port " + PORT));

module.exports = {app}