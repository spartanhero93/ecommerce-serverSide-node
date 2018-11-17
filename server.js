const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

/** DB Setup */
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => console.log('Mongoose is connected'));
mongoose.Promise = global.Promise;

/** Server setup */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', require('./routes/users'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
