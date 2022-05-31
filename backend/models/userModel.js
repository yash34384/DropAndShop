const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
    maxLength: [20, "Name should be less than 20 characters"],
    minLength: [5, "Name should be greater than 5 characters"]
  },
  email: {
    type: String,
    required: [true, "Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Enter a valid Email"]
  },
  rollNumber: {
    type: String,
    required: [true, "Enter your University Roll Number"],
    unique: true,
    maxLength: [15, "Name should be less than 20 characters"],
    minLength: [8, "Name should be greater than 8 characters"]
  },
  course: {
    type: String,
    required: [true, "Please enter your department for eg = b.tech I.T, CSE etc."]
  },
  year: {
    type: String,
    required: [true, "Enter your Year"]
  },
  password: {
    type: String,
    required: [true, "Enter a strong password"],
    minLength: [8, "Name should be greater than 8 characters"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "admin"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

//this is refered to the schema of the user
//encrypt the password before saving it 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {  //if we doesnot modifying password then doesnot            automatically encrpyt it  
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);  //Encrypt password by power 10
})

//cookies and automatically login
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare whether the password is correct or not
userSchema.methods.comparePassword = async function (password) {
  const check = await bcrypt.compare(password, this.password);
  // console.log(check);
  return check;
}

//Password reseting
userSchema.methods.getPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");  //generating token

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");  //hashing and adding resetpasswordtoken to user schema

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

module.exports = mongoose.model("User", userSchema);