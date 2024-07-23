const jwt = require('../../config/jwt');

const authenticate = (request, reply, next) => {
  const authHeader = request.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({ error: 'No token provided or token format is incorrect' });
  }

  const token = authHeader.split(' ')[1];
  
  const decoded = jwt.verifyToken(token);

  if (!decoded) {
    return reply.code(401).send({ error: 'Invalid token' });
  }

  console.log('Decoded token:', decoded);

  request.user = decoded;
  console.log('Authenticated user:', request.user);
  next();
};

module.exports = authenticate;
