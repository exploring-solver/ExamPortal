const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET

module.exports = {
  generateToken: (user) => {
    const payload = { id: user.id, username: user.username, role: user.role };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
};
