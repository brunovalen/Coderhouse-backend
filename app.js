const express = require('express');
const _ = require('lodash');
const logger = require('morgan');
require('dotenv').config();

const errorHandler = require('./src/middlewares/errorHandler');
const productRoutes = require('./src/routes/products/products.routes')
const chatsRoutes = require('./src/routes/chats/chats.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/api/products', productRoutes);
app.use('/api/chats', chatsRoutes);

app.use(errorHandler);

module.exports = app;