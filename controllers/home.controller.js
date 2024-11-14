const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
    // get products
    // render index.ejs

    productsModel.getAllProducts().then((products) => {
        res.render("index", {
            products: products,
        });
    });
    // get category
    //if Category is defined then filter by category else render all

    let category = req.query.category;
    if (category && category != 'all') {
        procuctsModel.getProductsByCategory(category).then((products) => {
            res.render("index", {
                products: products,
            });
        })
};
}
