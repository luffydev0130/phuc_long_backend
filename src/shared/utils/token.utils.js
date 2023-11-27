const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (payload) => {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'token_secret', {
      expiresIn: '2h',
    });
    return token;
  },

  generateRefreshToken: (payload) => {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'token_secret', {
      expiresIn: '3d',
    });
    return token;
  },
};
