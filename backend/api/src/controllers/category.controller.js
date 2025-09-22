const { Category } = require('../db');

exports.list = async (_req, res) => {
    const items = await Category.findAll({ order: [['name', 'ASC']] });
    res.json(items);
};

exports.get = async (req, res) => {
    const item = await Category.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
};

exports.create = async (req, res) => {
    const created = await Category.create(req.body); // { id, name }
    res.status(201).json(created);
};

exports.update = async (req, res) => {
    await Category.update(req.body, { where: { id: req.params.id } });
    const updated = await Category.findByPk(req.params.id);
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Category.destroy({ where: { id: req.params.id } });
    res.status(204).send();
};
