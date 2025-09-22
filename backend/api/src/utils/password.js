const bcrypt = require('bcryptjs');
exports.hash = (p) => bcrypt.hashSync(p, 10);
exports.compare = (p, h) => bcrypt.compareSync(p, h);
