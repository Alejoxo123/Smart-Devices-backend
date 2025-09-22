const { Router } = require('express');
const c = require('../controllers/comment.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const r = Router();
r.get('/', c.list);                 // público
r.post('/', requireAuth, c.create); // o público si quieres
r.delete('/:id', requireAuth, c.remove);
module.exports = r;
