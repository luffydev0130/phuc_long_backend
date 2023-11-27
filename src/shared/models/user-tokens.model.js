const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const UserTokens = mongoose.model('UserTokens', userTokenSchema);

module.exports = UserTokens;
