const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    phone: { type: String },
    gender: { type: String },
    address: { type: String },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
    isBlock: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
