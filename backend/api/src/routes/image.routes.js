const { Router } = require('express');
const c = require('../controllers/image.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const r = Router();

// público (si quieres listarlas por device)
r.get('/', c.list);
r.get('/:id', c.get);

// admin
r.post('/', requireAuth, c.create);
r.put('/:id', requireAuth, c.update);
r.delete('/:id', requireAuth, c.remove);

module.exports = r;
