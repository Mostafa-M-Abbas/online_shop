const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/online-shop";

// Connect once at startup instead of connecting/disconnecting for each query
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});
const products = mongoose.model("product", productSchema);
exports.getAllProducts = () => {
  //connect to database
  //get all products
  //disconnect from database

  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL).then(() => {
      return products
        .find({})
        .then((products) => {
          mongoose.disconnect();
          resolve(products);
        })
        .catch((err) => reject(err));
    });
  });
};

exports.getProductsByCategory = (category => {
    //connect to database
    //get products by category
    //disconnect from database

    return new Promise((resolve, reject) => {
      mongoose.connect(DB_URL).then(() => {
        return products
         .find({ category })
         .then((products) => {
            mongoose.disconnect();
            resolve(products);
          })
         .catch((err) => reject(err));
      });
    });
});

exports.getProductById = (id) => { 
  //connect to database
  //get product by id
  //disconnect from database
  return new promise(function (resolve, reject) { 
    mongoose.connect(DB_URL).then(() => {
      return products.findById(id).then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
       .catch((err) => reject(err));
    })
  })
}
