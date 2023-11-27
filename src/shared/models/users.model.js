const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    gender: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
);

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
