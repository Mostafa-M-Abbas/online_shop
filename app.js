const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);

const homeRouter = require("./routes/home.route");
const productRouter = require('./routes/product.route')

const app = express();

// Session Store
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/online-shop",
  collection: "sessions"
})

//Middleware
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// Flash Messages

app.use(flash());

// Set local variables middleware
app.use((req, res, next) => {
  res.locals.isAuth = req.session.userId;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

// Set up EJS template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", homeRouter);
app.use("/product", productRouter);

app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port 3000");
});