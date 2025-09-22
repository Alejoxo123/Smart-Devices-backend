const { Router } = require('express');
const c = require('../controllers/brand.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const r = Router();
r.get('/', c.list);
r.post('/', requireAuth, c.create);
r.put('/:id', requireAuth, c.update);
r.delete('/:id', requireAuth, c.remove);
module.exports = r;
