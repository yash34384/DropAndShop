const express = require("express");  //importing express
const app = express();  //calling express in app variable
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });  //reading config.env file
}

app.use(express.json());  //You NEED express.json() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);  //automatically add /api/v1 in starting of product function
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

app.use(errorMiddleware);  //automatically call middleware function

module.exports = app;