const jwt = require('../../config/jwt');

const authenticate = (request, reply, next) => {
  const token = request.headers['authorization'];
  if (!token) {
    return reply.code(401).send({ error: 'No token provided' });
  }

  const decoded = jwt.verifyToken(token);
  if (!decoded) {
    return reply.code(401).send({ error: 'Invalid token' });
  }

  request.user = decoded;
  next();
};

module.exports = authenticate;
