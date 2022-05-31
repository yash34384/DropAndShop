const app = require("./app");  //importing app file
const cors = require('cors');
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });  //reading config.env file
}

connectDatabase();  //call the function to connecting to database

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use(cors());

const server = app.listen(process.env.PORT, () => {  //starting server
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandeled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandeled rejection`);

  server.close(() => {
    process.exit(1);
  });
});