const { Router } = require('express');
const c = require('../controllers/auth.controller');
const r = Router();
r.post('/login', c.login);
r.post('/register', c.register); // opcional
module.exports = r;
