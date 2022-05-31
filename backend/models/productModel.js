const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({  //making a blueprint of product or schema
  name: {
    type: String,
    required: [true, "Name of book is required"],
    trim: true
  },
  course: {
    type: String,
    required: [true, "Course is required for example b.tech/mba/b.sc etc."]
  },
  field: {
    type: String,
    required: [true, "Field required for example I.T/Mechanical/finance etc."]
  },
  author: {
    type: String,
    required: [true, "If notes then enter your name"]
  },
  description: {
    type: String,
    required: [true, "Description required"]
  },
  price: {
    type: Number,
    default: 0,
    maxLength: [3, "Price should be less than 999 ruppees"]
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Product", productSchema);  //exporting schema and giving this name of "Product" now any file can use it by importing it