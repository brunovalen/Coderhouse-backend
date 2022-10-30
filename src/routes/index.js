const express = require('express');
const router = express.Router();
const products = require('./product');
router.use('/productos', products)
module.exports = router