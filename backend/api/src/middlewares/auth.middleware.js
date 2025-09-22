const { verify } = require('../utils/jwt');
exports.requireAuth = (req, res, next) => {
    const h = req.headers.authorization;
    if (!h?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    try { req.user = verify(h.slice(7)); next(); }
    catch { return res.status(401).json({ error: 'Invalid token' }); }
};
