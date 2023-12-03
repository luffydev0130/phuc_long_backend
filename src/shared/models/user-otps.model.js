const mongoose = require('mongoose');

const userOtpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    otpCode: { type: String, required: true },
    validUntil: { type: Date, required: true },
  },
  {
    timestamps: false,
  },
);

const UserOtps = mongoose.model('UserOtps', userOtpSchema);
module.exports = UserOtps;
