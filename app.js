const express = require('express');
const app = express();
app.use(express.static('public'));
const router = require('./src/routes/index')
const errorHandler = require('./src/midllewares/errohandle')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(errorHandler)
module.exports = app;