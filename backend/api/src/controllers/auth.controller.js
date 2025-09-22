const { User } = require('../db');
const { compare, hash } = require('../utils/password');
const { sign } = require('../utils/jwt');

exports.login = async (req, res) => {
    const { username, email, password } = req.body;
    const userOrEmail = username || email;
    const user = await User.findOne({ where: { email: userOrEmail } })
        || await User.findOne({ where: { name: userOrEmail } });
    if (!user || !compare(password, user.password)) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = sign({ sub: user.id, role: user.role, name: user.name });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

exports.register = async (req, res) => {
    const { name, email, password, role = 'admin' } = req.body;
    const created = await User.create({ name, email, password: hash(password), role });
    res.status(201).json({ id: created.id, name: created.name, email: created.email, role: created.role });
};
