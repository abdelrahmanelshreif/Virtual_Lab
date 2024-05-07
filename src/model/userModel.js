const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Plase Provide a Valid Email']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please Enter Your Mobile Phone Number']
    },
    role: {
      type: String,
      enum: ['student', 'teacher'],
      default: 'student',
      required: true
    },
    password: {
      type: String,
      required: [true, 'Please Provide Your Password'],
      minlength: 8,
      select: false
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre('save', async function(next) {
  //hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete password Confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
