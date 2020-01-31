const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const writeFeedback = require("./utils/writeFeedback");


// Initialise middleware
app.use(express.json({ extended: false }));

app.get('/hello', (req,res) => res.status(200).json({msg: "Hello World"}));

// WARNING! Errors may show if the routes files don't have module.exports = router;
app.use('/api/user', require('./routes/user.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/roles', require('./routes/roles'))

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