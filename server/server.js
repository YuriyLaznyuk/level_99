const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouters = require('./routes/userRouters');
const corsMiddleware = require('./middleware/cors.middleware');
const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static(path.resolve('dist')));
const DB = process.env.DATABASE;
const PORT = process.env.PORT || 7733;
app.get('*', (req, res) => {
	res.sendFile(path.resolve('dist', 'index.html'));
});
app.use(userRouters);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connect mongo DB'))
	.catch((err) => console.log(err));

app.listen(PORT, () => {
	console.log('listen port ', PORT);
});
