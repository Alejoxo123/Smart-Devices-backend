const { Router } = require('express');
const c = require('../controllers/category.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const r = Router();

// público
r.get('/', c.list);
r.get('/:id', c.get);

// admin
r.post('/', requireAuth, c.create);
r.put('/:id', requireAuth, c.update);
r.delete('/:id', requireAuth, c.remove);

module.exports = r;
