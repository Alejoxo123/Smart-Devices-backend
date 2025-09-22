const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'dev-secret';
exports.sign = (payload) => jwt.sign(payload, secret, { expiresIn: '8h' });
exports.verify = (token) => jwt.verify(token, secret);
