const mongoose = require("mongoose");  //mongoose

const connectDatabase = () => {  //function in which we connect database
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  })
}

module.exports = connectDatabase;