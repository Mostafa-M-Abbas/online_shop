const producsModel = require('../models/products.model'); 

exports.getProduct = (req, res, next) => {
    // connect to database
    // get product by id
    // disconnect from database
    const productId = req.params.id;
    productsModel.getProductById(productId).then((product) => {
        res.render('product', { product: product });
    })
}