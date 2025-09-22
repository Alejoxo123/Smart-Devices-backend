const { Comment } = require('../db');
const { Op } = require('sequelize');

exports.list = async (req, res) => {
    const { deviceId } = req.query;
    const where = {};
    if (deviceId) where.deviceId = deviceId;
    const items = await Comment.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(items);
};

exports.create = async (req, res) => {
    const { deviceId, userId, author, body, rating } = req.body;
    if (!deviceId || !body || !rating) return res.status(400).json({ error: 'Campos requeridos' });
    if (rating < 1 || rating > 5) return res.status(400).json({ error: 'rating debe ser 1..5' });
    const created = await Comment.create({ deviceId, userId, author, body, rating });
    res.status(201).json(created);
};

exports.remove = async (req, res) => {
    await Comment.destroy({ where: { id: req.params.id } });
    res.status(204).send();
};
