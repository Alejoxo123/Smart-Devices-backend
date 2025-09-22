const { Router } = require('express');
const c = require('../controllers/tag.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const r = Router();

// público
r.get('/', c.list);
r.get('/:id', c.get);

// admin
r.post('/', requireAuth, c.create);
r.put('/:id', requireAuth, c.update);
r.delete('/:id', requireAuth, c.remove);

// relaciones device-tag (admin)
r.post('/:id/devices/:deviceId', requireAuth, c.attachToDevice);
r.delete('/:id/devices/:deviceId', requireAuth, c.detachFromDevice);

module.exports = r;
