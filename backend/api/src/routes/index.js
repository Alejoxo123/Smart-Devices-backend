const { Router } = require('express');
const auth = require('./auth.routes');
const brand = require('./brand.routes');
const category = require('./category.routes');
const device = require('./device.routes');
const comment = require('./comment.routes');
const image = require('./image.routes');
const tag = require('./tag.routes');

const r = Router();
r.use('/auth', auth);
r.use('/brands', brand);
r.use('/categories', category);
r.use('/devices', device);    // filtros para Home
r.use('/comments', comment);  // listado por deviceId
r.use('/images', image);
r.use('/tags', tag);

module.exports = r;
