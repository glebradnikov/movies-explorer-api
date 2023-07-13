const express = require('express');
const mongoose = require('mongoose');
const { PORT, URL } = require('./utils/constants');

const app = express();

mongoose.connect(URL);

app.listen(PORT);
