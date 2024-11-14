const router = require('express').Router();
const productController = require('../controllers/product.controller'); 

// Product routes

router.get('/product/:id' , productController.getProduct); 

module.exports = router;